console.log('chat');

let socket = io.connect();
// let socket = io.connect('192.168.88.168:4000c');

var message = document.getElementById('message'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      typing = document.getElementById('typing')


btn.addEventListener('click', function () {
    console.log(message.value);
    if(message.value.length > 0 ) {
        socket.emit('chat' , {
            message: message.value,
            user: document.getElementById('username').textContent
         })
         message.value = "";
    }

})

message.addEventListener('keyup', function (key) {
    if (key.keyCode == 13) {
        console.log('egw malakizomai');
        if (message.value.length > 0){
            socket.emit('chat' , {
                message: message.value,
                user: document.getElementById('username').textContent
             })
             message.value = "";
            //  typing.innerHTML = "";
        }
    }
})


socket.on('chat' , function(data) {
    // document.getElementById('xyz').play();
    console.log('answer received');
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
})


socket.on('message-sound' , function () {
    document.getElementById('xyz').play();
});

window.addEventListener('keydown', function () {
    socket.emit('typing' ,document.getElementById('username').textContent );
})

socket.on('typing' , function (user){
    typing.innerHTML = `<p><i> ${user} is ` + 'typing... </i></p>';
});

socket.on('no-typing' , function () {
    typing.innerHTML = '';
    typing.innerText = '';
})


window.addEventListener('keyup', function () {
    // clearTimeout(timer);
    let timer = setTimeout(socket.emit('no-typing'), 15000);
})