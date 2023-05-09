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
    x = 0.899999999999
    print("{0:.3f}".format(x))
    app.run(debug=True)