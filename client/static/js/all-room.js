var allRoomData = {
    items: [],
    newRoomInput: ''
};

var allRoom = Vue.extend({
    template:
            '<div id="my-nav">\
               <my-navbar></my-navbar>\
             </div>\
             <div class="page-header" style="text-align: center;">\
               <h1 id="page-tite"> \
                 <span  class="all-room-label label label-me"> \
                   <a> All Room </a>\
                 </span>\
               </h1>\
             </div>\
             <div class="new-room-box" id="add-room-box">\
               <div class="row well well-lg form-group">\
                 <div class="col-sm-1"><span class="glyphicon glyphicon-plus"></span></div>\
                 <div class="col-sm-9">\
                   <input type="text" class="form-control new-room-name" \
                          placeholder=" room name" v-model="newRoomInput" v-on:keyup.enter="addRoom"> \
                 </div>\
                 <div class="col-sm-2">\
                   <button id="create-room" class="btn btn-success" v-on:click="addRoom">\
                     <span class="new-btn">Create</span>   \
                   </button>\
                 </div>\
               </div>\
             </div> \
             <div class="room-list" id="all-list">\
               <div class="row well well-lg" v-for="item in items">\
                 <div class="col-sm-1"><span class="glyphicon glyphicon-star"></span></div>\
                 <div class="col-sm-9"><a @click="foo">{{ item.name }}</a></div>\
                 <div class="col-sm-2">\
                   <button class="btn btn-warning">\
                     <span class="join-btn" id="roomid-{{item.roomId}}">Join</span>   \
                   </button>\
                 </div>\
               </div>\
             </div>',
    data: function () {
         console.log(allRoomData.items)
        return allRoomData;
    },
    methods: {
        addRoom: function () {
            var name = this.newRoomInput.trim()
            if (name) {
                POKi.refreshAll().onReady(function() {
                    POKi.getMaster().emit('create room', { userId: USERID, roomname: name });
                },function() {
                    toastr.error("Server is disconnected.");
                });
            }
            this.newRoomInput = ''
        },
        foo: function () {
            router.go('/chat-room');
        }
    }
})

allRoom.setAllRoomData = function(data) {
    allRoomData.items = [];
    data.forEach(function(room) {
        allRoomData.items.push({ name: room.roomname, roomId: room.room_id});
    });
}

allRoom.addAllRoomData = function(data) {
    allRoomData.items.push({ name: data.roomname, roomId: data.room_id});
}
