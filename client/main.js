$(document).ready(function(){
    var MyNav = Vue.extend({
    template:
        '<nav class="navbar navbar-fixed-top navbar-default" role="navigation">\
            <div class="navbar-header">\
                <a class="navbar-brand" href="#">POKi</a>\
            </div>\
            <div class="navbar-collapse">\
                <ul class="nav navbar-nav navbar-left">\
                    <li><a href="./joined-room.html">JOINED ROOM</a></li>\
                    <li><a href="./all-room.html">ALL ROOM</a></li>\
                    <li><a href="./people.html">PEOPLE</a></li>\
                    <li><a href="./setting.html">SETTING</a></li>\
                </ul>\
                <ul class="nav navbar-nav navbar-right">\
                    <li><a href="#" v-on:click="logout($event)">Logout</a></li>\
                </ul>\
            </div>\
        </nav>',
        methods: {
            logout: function(event) {
                event.preventDefault();
                $.ajax({
                    type: "GET",
                    async: false,
                    url : POKi.getLocation() + "/logout",
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(response) {
                        router.go('/');
                        toastr.success(response);
                    },
                    error: function(){
                        toastr.error('Server is disconnected.');
                    }
                });
            }
        }
    });
    Vue.component('my-navbar', MyNav);
});

var App = Vue.extend({});

var router = new VueRouter();

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
