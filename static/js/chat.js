document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("user-name").value = localStorage.getItem("username");

    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {

        document.getElementById("send-btn").onclick = () => {
            var name = document.getElementById("user-name").value;
            var msg = document.querySelector(".msg-content-box").value;

            socket.emit('send msg', {
                "name": name,
                "message": msg,
            })
        }
    });
    socket.on('update message', data => {


        var fullmsg = document.createElement("p");
        fullmsg.classList.add("full-msg");
        var msgcontent = document.createElement("span");
        msgcontent.classList.add("msg-content");
        msgcontent.innerHTML = data.message;
        var msgby = document.createElement("span");
        msgby.classList.add("msg-by");
        msgby.innerHTML = ` by ${data.name}`;
        fullmsg.append(msgcontent);
        fullmsg.append(msgby);


        document.querySelector('#chat-box').append(fullmsg);
    });


});