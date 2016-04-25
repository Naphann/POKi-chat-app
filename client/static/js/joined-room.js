var joinedData = {
    items: [
    { name: 'SA Room' , new_msg : '16 New' },
    { name: 'Dis Sys Room' , new_msg : '13 New' },
    { name: 'TechWrite Room' , new_msg : '13 New' },
    { name: 'CP40 Room' , new_msg : '13 New' },
    { name: 'CP40.5 Room' , new_msg : '13 New' },
    { name: 'SensorTech Room' , new_msg : '13 New' },
    { name: 'Teacup Room' , new_msg : '19 New' }
    ]
};

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

$(window).load(function() {
    var joinedList = new Vue({
         el: '#joined-list'
    })
});
