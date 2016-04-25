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

var temp = Vue.extend({
    template: '<h1>hello</h1>'
})

var temp2 = Vue.extend({
    template: '<h1>hello22</h1>'
})

$(window).on('load', function() {
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
    router.start(App, '#container');
});
