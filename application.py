import os

from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

chats = [

]

channels = [
    {
        "id": 0,
        "created_by": "Bharat",
        "name": "Forza Juve",
        "desc": "A chat room for Juve fans"
    },
    {
        "id": 1,
        "created_by": "Arjun",
        "name": "Anime Addicts",
        "desc": "Only Anime addicts allowed!"
    }
]


@app.route("/")
def index():
    return render_template("index.html", channels=channels)


@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        username = request.form.get("username")
        channelname = request.form.get("channelname")
        desc = request.form.get("desc")
        print(f"{username} {channelname} {desc}")
        channels.append({
            "id": len(channels),
            "created_by": username,
            "name": channelname,
            "desc": desc,
        })
        return redirect(url_for('index'))
    return render_template("add.html")


@app.route("/chat/<int:channel_id>")
def chat(channel_id):
    channel = channels[channel_id]
    return render_template("chat.html", channel=channel)


@socketio.on("send msg")
def msg(data):
    emit("update message", data, broadcast=True)
