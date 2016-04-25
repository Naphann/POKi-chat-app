$(document).ready(function(){
    var MyNav = Vue.extend({
    template:
        '<nav class="navbar navbar-fixed-top navbar-default" role="navigation">\
                <ul class="nav navbar-nav navbar-left">\
                    <li class="pull-left" ><a href="#">POKi</a></li>\
                    <li v-link-active ><a v-link="{ path: \'/joined-room\',activeClass: \'active\' }">JOINED ROOM</a></li>\
                    <li v-link-active ><a v-link="{ path: \'/all-room\'  ,activeClass: \'active\' }">ALL ROOM</a></li>\
                    <li v-link-active ><a v-link="{ path: \'/people\'    ,activeClass: \'active\' }">PEOPLE</a></li>\
                    <li v-link-active ><a v-link="{ path: \'/setting\'   ,activeClass: \'active\' }">SETTING</a></li>\
                    <li class="pull-right" ><a href="#" v-on:click="logout($event)">Logout</a></li>\
                </ul>\
        </nav>\
        <div style="margin-bottom: 80px;"></div>',
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

    template:  '<div id="my-nav">\
                    <my-navbar></my-navbar>\
                </div>\
                <h1>COMING SOON</h1>'
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
    router.beforeEach(function (transition) {
        if (transition.to.path === '/') {
            if(POKi.isStart != undefined && POKi.isStart) {
                console.log("CALLLL",POKi.isStart);
                POKi.retry(function() {
                    setTimeout(Welcome.serverConnect,300);
                    // launchSocket();
                },function() {
                    Welcome.serverDown();
                });
            }
        }
        transition.next();
    });
    router.start(App, '#container');
});
