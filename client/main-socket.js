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
        socket.emit('roomname', { roomId: currentRoom });
    })
    // when click on join room
    // $(document).on('click','.join-btn', function () {
    //     var roomid = $(this).data('room-id');
    //     console.log("roomid to join");
    //     console.log(roomid);
    //     socket.emit('subscribe room', { userId:USERID ,roomId: roomid });
    // })
    // when leave room
    $('#leave-room').on('click', function () {
        socket.emit('leave room', { room: currentRoom });
    });
    // called when permanent exit from the room
    $(document).on('click','.unsubscribe-room', function () {
        // place holder dummy
        console.log("unsub");
        var roomid = $(this).data('room-id');
        console.log(roomid);
        socket.emit('unsubscribe room', { userId: USERID,roomId: roomid });
    }) 

    /* list of listened events */
    // message get by being in the room
    socket.on('message', function (results) {
        appendMessage(results);
    });
    // results from creating room
    socket.on('create room', function (results) {
        if(results.success) {
            allRoom.addAllRoomData(results.roomId,results.roomname);
            toastr.success("Crete room success.");
        }
    });
    // data from all-room
    socket.on('all-room', function (results) {
        allRoom.setAllRoomData(results);
    });
    //send userID to get joined-room
    router.beforeEach(function (transition) {
        if (transition.to.path === '/joined-room') {
            socket.emit('joined-room',{ userId: USERID});
        } else if(transition.to.path === '/all-room') {
            socket.emit('all-room', { userId: USERID});
        } else if (transition.to.path === '/chat-room') {
            
        }
            transition.next();
    })
    // data from joined-room
    socket.on('joined-room', function (results) {
        getjoinedData(results);
    });
    // list of unread message
    socket.on('get unread', function (results) {
        console.log('unread results');
        // console.log(results);
        getChatRoomData(results);
        CURRENT_ROOM_NAME = results.roomname;
        router.go('/chat-room');
    });
    
    
    socket.on('roomname', function(results){
        console.log('room nameeeee')
        console.log(results);
        CURRENT_ROOM_NAME = results.roomname;
    });
    

    //check insert join room successful
    socket.on('check-join-room', function (results) {
        if(results.success) {
            allRoom.removeRoom(results.roomId);
            toastr.success("Joined room.");
        }
    });

    socket.on('check-unsubscribe', function (results) {
        if(results.success) {
            console.log("unsub success");
            joinedRoom.removeRoom(results.roomId);
            toastr.success("unsubscribe room.");
        }
    });
}
