#!/usr/bin/env bash

ENV_FILE=.env
if [ ! -f "./@app/server/$ENV_FILE" ]; then
    echo "creating $ENV_FILE"
    cp ./@app/server/$ENV_FILE.base ./@app/server/$ENV_FILE
elif [ ! -f "./@app/client/$ENV_FILE" ]; then
    echo "creating $ENV_FILE"
    cp ./@app/client/$ENV_FILE.base ./@app/client/$ENV_FILE
else 
    echo "$ENV_FILE already exists"    
fi
