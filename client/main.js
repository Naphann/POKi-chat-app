$(document).ready(function(){
    var MyNav = Vue.extend({
    template: '<nav class="navbar navbar-default">'+
               '<ul class="poki-nav nav navbar-nav">'+
                    '<li><a href="./joined-room.html">JOINED ROOM</a></li>'+
                    '<li><a href="./all-room.html">ALL ROOM</a></li>'+
                    '<li><a href="./people.html">PEOPLE</a></li>'+
                    '<li><a href="./setting.html">SETTING</a></li>'+
               '</ul>'+
            '</nav>'
    });
    Vue.component('my-navbar', MyNav);
});

var App = Vue.extend({});

var router = new VueRouter();

var MyNav = Vue.extend({
    template: '<nav class="navbar navbar-default">'+
               '<ul class="poki-nav nav navbar-nav">'+
                    '<li><a href="./joined-room.html">JOINED ROOM</a></li>'+
                    '<li><a href="./all-room.html">ALL ROOM</a></li>'+
                    '<li><a href="./people.html">PEOPLE</a></li>'+
                    '<li><a href="./setting.html">SETTING</a></li>'+
               '</ul>'+
            '</nav>'
    });

var joinedRoom = Vue.extend({
    template:   '<div id="my-nav">\
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
                    <div class="row well well-lg" v-for="item in items" >\
                        <div class="col-sm-1"><span class="glyphicon glyphicon-heart"></span></div>\
                        <div class="col-sm-8">\
                            <a href="./chat-room.html?room={{ item.name }}">{{ item.name }}</a>\
                        </div>\
                        <div class="col-sm-3"><span class="new-msg">{{ item.new_msg }}</span></div>\
                    </div>\
            </div>'
       ,
       data : function  () {
           return joinedData;
       }

})

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

var chatRoom = Vue.extend({
    template:   '<div id="my-nav">\
        <my-navbar></my-navbar>\
    </div>\
    <div class="page-header" style="text-align: center; margin-bottom: 28px;">\
        <h1 id="page-tite"> \
           <span  class="chat-room-label label label-me"> \
              {{room_name}}\
           </span>\
        </h1>\
    </div>\
    <div class="container chat-css">\
        <div class="col-md-12">\
            <div class="panel">\
                <!--Heading-->\
                <div class="panel-heading">\
                    <h3 class="panel-title">Chat</h3>\
                </div>\
                <!--Widget body-->\
                <div id="demo-chat-body" class="collapse in">\
                    <div class="nano has-scrollbar" style="height:450px">\
                        <div class="nano-content pad-all" tabindex="0" style="right: -17px;">\
                            <ul class="list-unstyled media-block" id="msg-list">\
                                <li class="mar-btm" v-for="item in items">\
                                    <div class="media-{{item.pos}}">\
                                        <img src="./static/img/avatar.png" class="img-circle img-sm" alt="Profile Picture">\
                                    </div>\
                                    <div class="media-body pad-hor speech-{{item.pos}}">\
                                        <div class="speech">\
                                            <a href="#" class="media-heading">{{item.username}}</a>\
                                            <p>{{item.message}}</p>\
                                            <p class="speech-time">\
                                                {{item.time}}\
                                            </p>\
                                        </div>\
                                    </div>\
                                </li>\
                            </ul>\
                        </div>\
                    <div class="nano-pane"><div class="nano-slider" style="height: 141px; transform: translate(0px, 0px);"></div></div></div>\
                    <!--Widget footer-->\
                    <div class="panel-footer" id="add-msg-box">\
                        <div class="row">\
                            <div class="col-xs-9">\
                                <input type="text" placeholder="Enter your text" class="form-control chat-input" \
                                       v-model="newMsgInput" v-on:keyup.enter="addMsg">\
                            </div>\
                            <div class="col-xs-3">\
                                <button class="btn btn-primary btn-block" type="submit" v-on:click="addMsg">Send</button>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>'
       ,
       data : function  () {
           return chatData;
       } ,
       methods: {
            addMsg: function () {
                var msg = this.newMsgInput.trim()
                if (msg) {
                    chatData.items.push( { username: 'Kim', pos: 'right', message: msg , time: '9:50 AM' })
                    this.newMsgInput = ''
                }
            }
        }
})

var temp = Vue.extend({
    template: '<h1>hello</h1>'
})

var temp2 = Vue.extend({
    template: '<h1>hello22</h1>'
})

router.map({
    '/': {
        component: Welcome
    },
    '/all-room': {
        component: allRoom
    },
    '/joined-room': {
        component: joinedRoom
    },
    '/people': {
        component: temp
    },
    '/setting': {
        component: temp
    },
    '/chat-room': {
        component: chatRoom
    }
});

$(window).on('load', function() {
    router.start(App, '#container');
});
