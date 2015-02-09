#!/bin/bash

ADAPTERS='api/adapters/sails-rest'

# Install bower dependencies
bower install --allow-root

# Install the adapter
if [ "$(ls -A $ADAPTERS)" ]; then

    echo "Info: sails-rest already installed."

else
    PREV_PWD=$(pwd)

    mkdir -p $ADAPTERS

    cd $ADAPTERS

    git clone ssh://git@stash.priv.itevents.fr:7999/utils/sails-rest.git .

    npm install

    cd "$PREV_PWD"
fi
