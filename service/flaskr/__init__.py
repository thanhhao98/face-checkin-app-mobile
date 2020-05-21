import os
from flask import Flask

class App():
    def __init__(self, appName):
        self.appName = appName
        self.app = Flask(self.appName)
        @self.app.route('/api/v1/login')
        def login():
            return 'loginFace'

    def run(self):
        self.app.run(debug=True)
