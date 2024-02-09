#!/usr/bin/env python3
"""Starts a Flask web application"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', strict_slashes=False)
def index():
    """
    Route for the index page, rendering the '0-index.html' template.
    """
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run()
