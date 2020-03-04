# To run:

update config.js

build and run with docker-compose: 

    docker-compose up -d

enter the container and register your phone number with signal: 

    ./signal-cli/bin/signal-cli -u +1000000000 register

verify the number: 

    ./signal-cli/bin/signal-cli -u +1000000000 verify 123-456

