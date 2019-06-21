const socket = require('socket.io');


function socketHandler(server){
    console.log('handling socket');
    let io = socket(server);
    io.on('connection', function (inc_socket){
        console.log('socket connected with id: ', inc_socket.id);
        inc_socket.on('chat' , function(data){
            console.log('incoming data: ' + data.message );
            io.emit('chat',data);
            inc_socket.broadcast.emit('message-sound');
        } );

        inc_socket.on('typing' , (user) => {
            inc_socket.broadcast.emit('typing' , user );
        })

        inc_socket.on('no-typing', () => {
            inc_socket.broadcast.emit('no-typing');
        })
    });

}


module.exports = socketHandler;