#!/bin/bash

if [ ! -d "venv" ]; then
	echo "Setup environment"
	python3 -m venv venv
	source venv/bin/activate
	python3 -m pip install -r requirements.txt
fi
if [ -f "venv/bin/activate" ]; then
	echo "Loading Python vitualenvl from folder venv"
	source venv/bin/activate
else
	echo "Folder venv is error, please check it!"
fi

export FLASK_APP=main.py
export FLASK_ENV=development
