from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


currentFacultIndex = 1

@app.route("/getCurrentFacultIndex")
def hello_world():
    global currentFacultIndex
    currentFacultIndex += 1
    return jsonify(currentFacultIndex)


if __name__ == "__main__":
    app.run(debug=True)