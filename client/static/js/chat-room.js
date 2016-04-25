var chatData = {
    items: [
        { username: 'Paul', pos: 'left', message: 'Hello POKI.', time: '9:45 AM' },
        { username: 'IngIng', pos: 'left', message: 'Hello Word.', time: '9:46 AM' },
        { username: 'Omar', pos: 'left', message: 'Hello DisSys.', time: '9:47 AM' },
        { username: 'Kim', pos: 'right', message: 'Hello Friends.', time: '9:48 AM' },
        { username: 'Paul', pos: 'left', message: 'Good luck.', time: '9:49 AM' },
    ],
    newMsgInput: '',
    room_name: 'TestRoomName'
};

var getChatRoomData = function (results) {
    chatData.items = [];
    chatData.room_name = CURRENT_ROOM_NAME;
    results.forEach(function (msg, index) {
        console.log(msg);
        // chatData.items.push(msg);
        var timeStamp = msg.time.split('T').join(' ').split('.')[0];
        // timeStamp = (+(timeStamp.split(' ')[1].split(':')[0]) + 7)
        var obj = {
            username: msg.username,
            pos: msg.username === USERNAME ? 'right' : 'left',
            message: msg.content.trim(),
            time: timeStamp
        }
        chatData.items.push(obj);
    });
};

var appendMessage = function (msg) {
    var timeStamp = msg.time.split('T').join(' ').split('.')[0];
    var obj = {
        username: msg.username,
        pos: msg.username === USERNAME ? 'right' : 'left',
        message: msg.content.trim(),
        time: timeStamp
    }
    chatData.items.push(obj);
};

var chatRoom = Vue.extend({
    template: '<div id="my-nav">\
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
    data: function () {
        return chatData;
    },
    methods: {
        addMsg: function () {
            var msg = this.newMsgInput.trim()
            if (msg == '') return;
            this.newMsgInput = ''
            var msgObj = {
                content: msg,
                senderId: USERID,
                roomId: CURRENT_ROOM,
                username: USERNAME
            };
            POKi.masterServer.emit('message', msgObj);
        }
    }
})
