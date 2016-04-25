var allRoomData = {
            items: [
                { name: 'SA Room'  },
                { name: 'Dis Sys Room' },
                { name: 'TechWrite Room' },
                { name: 'CP40 Room' },
                { name: 'CP40.5 Room' },
                { name: 'SensorTech Room'  },
                { name: 'Teacup Room'  }
            ],
            newRoomInput: ''
        };

var allRoom = Vue.extend({
    template:   '<<div id="my-nav">\
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
                        <button class="btn btn-success" v-on:click="addRoom">\
                            <span class="new-btn">Create</span>   \
                        </button>\
                    </div>\
                </div>\
            </div> \
            <div class="room-list" id="all-list">\
                <div class="row well well-lg" v-for="item in items">\
                    <div class="col-sm-1"><span class="glyphicon glyphicon-star"></span></div>\
                    <div class="col-sm-9"><a href="#">{{ item.name }}</a></div>\
                    <div class="col-sm-2">\
                        <button class="btn btn-warning">\
                            <span class="join-btn">Join</span>   \
                        </button>\
                    </div>\
                </div>\
            </div>'
       ,
       data : function  () {
           return allRoomData;
       } ,
       methods: {
            addRoom: function () {
                var name = this.newRoomInput.trim()
                if (name) {
                    allRoomData.items.unshift({ name: name })
                    this.newRoomInput = ''
                }
            }
        }
})

$(window).load(function() {
    var allList = new Vue({
        el: '#all-list'
    });
    new Vue({
        el: '#add-room-box'
     });
});
