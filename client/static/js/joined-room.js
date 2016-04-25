var joinedData = {
    items: []
};

var getjoinedData = function (results) {
    //console.log(results.roomname);
    // console.log('rest');
    // console.log(results)
    // console.log(results.length)
    // joinedData = results;
    if (results.length == 0) {
        $('#joind-list').addClass('hidden')
        $('#error-pane').removeClass('hidden');
    } else {
        $('#joind-list').removeClass('hidden')
        $('#error-pane').addClass('hidden');
    }

    joinedData.items = [];
    results.forEach(function (item) {
        console.log(item);
        joinedData.items.push({ name: item.roomname, new_msg: '0 New', roomId: item.room_id});
    })
    // joinedData.items = results;
    // console.log(joinedData.item);

    //joinedData = results
};

var joinedRoom = Vue.extend({
    template: '<div id="my-nav">\
                    <my-navbar></my-navbar>\
               </div>\
               <div class="page-header" style="text-align: center;">\
                 <h1 id="page-tite"> \
                   <span  class="่joined-label label label-me"> \
                     <a href="./joined-room.html"> Joined Room </a>\
                   </span>\
                 </h1>\
               </div>\
               <div class="room-list" id="joined-list">\
                 <div id="room-{{item.roomId}}" class="row well well-lg" v-for="item in items" >\
                   <div class="col-sm-1"><span class="glyphicon glyphicon-heart"></span></div>\
                   <div class="col-sm-7" id="joined-room-list">\
                     <a @click="gotoChatRoom(item.roomId)" data-room-id="{{item.roomId}}">{{ item.name }}</a>\
                   </div>\
                   <div class="col-sm-4">\
                        <span class="new-msg">{{ item.new_msg }}</span>\
                        <button data-room-id="{{item.roomId}}" class="btn btn-danger unsubscribe-room">\
                            <span>Unsubscribe</span>   \
                        </button>\
                   </div>\
                 </div>\
               </div>\
               <div class="hidden" id="error-pane"><h1>No room to show</h1></div>'
               
                ,
    data: function () {
        return joinedData;
    },
    methods: {
        gotoChatRoom: function (roomId) {
            console.log('call get ' + roomId);
            POKi.masterServer.emit('leave room', { roomId: CURRENT_ROOM });
            POKi.masterServer.emit('join room', { roomId: roomId} );
            CURRENT_ROOM = roomId;
            POKi.masterServer.emit('get unread', { userId: USERID, roomId: roomId});
        }
    }
})

joinedRoom.removeRoom = function(roomId) {
    console.log("remove room in join room");
    $("#room-"+roomId).remove();
}
