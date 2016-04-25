var allRoomData = {
    items: [
        {
            name: 'SA Room',
            roomId: 1
        },
        {
            name: 'Dis Sys Room',
            roomId: 2
        },
        {
            name: 'TechWrite Room',
            roomId: 3
        },
        {
            name: 'CP40 Room',
            roomId: 4
        },
        {
            name: 'CP40.5 Room',
            roomId: 5
        },
        {
            name: 'SensorTech Room',
            roomId: 6
        },
        {
            name: 'Teacup Room',
            roomId: 7
        }
    ],
    newRoomInput: ''
};
var getallData = function(results){
    //console.log(results.roomname);
    // console.log('rest');
    // console.log(results)
    // console.log(results.length)
    // joinedData = results;
    /*if(results.length == 0){
        $('#joind-list').addClass('hidden')
        $('#error-pane').removeClass('hidden');
    } else {
        $('#joind-list').removeClass('hidden')
        $('#error-pane').addClass('hidden');
    }*/
 
    allRoomData.items = [];
    results.forEach(function(item) {
        console.log(item);
        allRoomData.items.push({ name: item.roomname, roomId: item.room_id});
    })
    // joinedData.items = results;
    // console.log(joinedData.item);
   
   //joinedData = results
};
var hideRoom = function(results){
    console.log(results.roomId);
    $('#room-'+results.roomId).addClass('hidden');
};
var allRoom = Vue.extend({
    template: '<div id="my-nav">\
                   <my-navbar></my-navbar>\
                 </div>\
                 <div class="page-header" style="text-align: center;">\
                   <h1 id="page-tite"> \
                     <span  class="all-room-label label label-me"> \
                       <a href="./all-room.html"> All Room </a>\
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
                       <button class="btn btn-success" id="create-room" v-on:click="addRoom">\
                         <span class="new-btn">Create</span>   \
                       </button>\
                     </div>\
                   </div>\
                 </div> \
                 <div class="room-list" id="all-list">\
                   <div class="row well well-lg" id="room-{{ item.roomId }}" v-for="item in items">\
                     <div class="col-sm-1"><span class="glyphicon glyphicon-star"></span></div>\
                     <div class="col-sm-9"><a @click="foo">{{ item.name }}</a></div>\
                     <div class="col-sm-2">\
                       <button class="btn btn-warning">\
                         <span class="join-btn" data-room-id="{{item.roomId}}">Join</span>   \
                       </button>\
                     </div>\
                   </div>\
                 </div>',
    data: function () {
        return allRoomData;
    },
    methods: {
        addRoom: function () {
            var name = this.newRoomInput.trim()
            if (name) {
                allRoomData.items.unshift({ name: name })
                this.newRoomInput = ''
                POKi.masterServer.emit(roomname: name);
            }
        },
        foo: function () {
            router.go('/chat-room')
        }
    }
})
