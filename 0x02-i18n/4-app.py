#!/usr/bin/env python3
""" 4-app module """
from typing import Union
from flask import Flask, request, render_template
from flask_babel import Babel
from config import Config

app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


@babel.localeselector
def get_locale() -> Union[str, None]:
    """ get locale """
    locale = request.args.get('locale')
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/', methods=["GET"], strict_slashes=False)
def home():
    """ Home page """
    return render_template('4-index.html')


if __name__ == "__main__":
    app.run()
