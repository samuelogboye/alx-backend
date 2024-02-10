#!/usr/bin/env python3
'''Get locale from request'''


from flask import Flask, request, render_template
from flask_babel import Babel
from config import Config


app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """Get locale from request"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """Index page"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
