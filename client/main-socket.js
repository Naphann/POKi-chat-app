function launchSocket() {
    var socket = POKi.masterServer;
    var userId = 4;
    var currentRoom = 0;
    var roomName = 'main room';

    socket.emit('join room', roomName);

    socket.emit('join room', { roomId: '1' });

    /* list of events emit */
    // send message event
    $('#send-message').on('click', function () {
        socket.emit('message', {
            content: 'hello world',
            roomId: '1',
            senderId: '4'
        })
        console.log('click btn');
    });
    // should be called after joining the room
    $('#get-unread').on('click', function () {
        socket.emit('get unread', { userId: userId, roomId: currentRoom });
    })
    // when click on join room
    $('#join-room').on('click', function () {
        socket.emit('join room', { room: currentRoom });
    })
    // when leave room
    $('#leave-room').on('click', function () {
        socket.emit('leave room', { room: currentRoom });
    });
    // called when create new room
    $('#create-room').on('click', function () {
        // place holder dummy
        var roomName = null || 'room 39';
        socket.emit('create room', { roomname: roomName });
    });
    // called when subscribe to new rooms
    $('#subscribe-room').on('click', function () {
        // place holder dummy
        var roomId = null || -1;
        socket.emit('subscribe room', { roomId: roomId });
    });
    // called when permanent exit from the room
    $('#unsubscribe-room').on('click', function () {
        // place holder dummy
        var roomId = null || -1;
        socket.emit('unsubscribe room', { roomId: roomId });
    });
    // should be called when in all-room page
    $('#get-all-room').on('click', function () {
        socket.emit('all-room', { userId: userId });
    });
    // should be called when in joined-room page
    $('#get-joined-room').on('click', function () {
        socket.emit('joined-room', { userId: userId });
    });

    /* list of listened events */
    // message get by being in the room
    socket.on('message', function (results) {
        console.log(results);
    });
    // results from creating room
    socket.on('create room', function (results) {
        console.log(results);
    });
    // data from all-room 
    socket.on('all-room', function (results) {
        console.log(results);
    });
    //send userID to get joined-room
    router.beforeEach(function (transition) {
        if (transition.to.path === '/joined-room') {
            socket.emit('joined-room',{ userId: USERID});
        } else if (transition.to.path === '/chat-room') {
            
        }
            transition.next();
    })
    // data from joined-room
    socket.on('joined-room', function (results) {
        //console.log('this is the raw results')
        //console.dir(results)
        //console.log('===========================')
        getjoinedData(results);
    });
    // list of unread message     
    socket.on('get unread', function (results) {
        console.log('unread results');
        // console.log(results);
        getChatRoomData(results);
        router.go('/chat-room');
    });

}