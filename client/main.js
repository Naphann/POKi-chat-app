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

router.map({
    '/': {
        component: Welcome
    },
    '/all-room': {
        component: temp
    },
    '/joined-room': {
        component: temp2
    },
    '/people': {
        component: temp
    },
    '/setting': {
        component: temp
    },
});

$(window).on('load', function() {
    router.start(App, '#container');
});
