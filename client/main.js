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
    if( $(document).find('#my-nav').length > 0){
        new Vue({
            el: '#my-nav'
        });
    }
    

});


var socket = io('http://localhost:3000');
socket.on('test', function(data) {
    console.log(data);
});

