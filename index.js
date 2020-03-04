let config = require('./config');
let signal_from = config.signal_from;
let signal_to = config.signal_to;

var mqtt = require('mqtt');
var mqttclient  = mqtt.connect(config.mqtt_server);
const { exec } = require("child_process");

mqttclient.on('connect', function () {
  mqttclient.subscribe(config.mqtt_topic);
})

mqttclient.on('message', function (topic, message) {
  if (topic == config.mqtt_topic) {
    var data = JSON.parse(message.toString());
    send_signal_message(data.message);
  }
});

function send_signal_message(message) {
  let signal_message = message.replace(/(["'$`\\])/g,'\\$1'); // input sanitization
  let command = '/usr/src/app/signal-cli/bin/signal-cli -u ' + signal_from + ' send -m "' + signal_message + '" ' + signal_to;
  exec(command, (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);

    // receive messages so they don't stack up on the server
    receive_signal_messages();
  });
}

function receive_signal_messages() {
  let command = '/usr/src/app/signal-cli/bin/signal-cli -u ' + signal_from + ' receive';
  exec(command, (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
  });
}
