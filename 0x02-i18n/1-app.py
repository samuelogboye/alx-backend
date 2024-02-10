#!/usr/bin/env python3
"""Basic Babel setup"""

from flask import Flask, render_template
from flask_babel import Babel
from config import Config

app = Flask(__name__)
babel = Babel(app)


app.config.from_object(Config)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """
    Route for the index page, rendering the '1-index.html' template.
    """
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run()
