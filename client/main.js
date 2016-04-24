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

var Login = Vue.extend({
    template: '<div style="position:absolute;left:40%">\
        <img src="../static/img/poki.png" alt="POKI Picture" style="margin-top:50px">\
        <form role="form" id="login-form" method="post">\
            <h2>Login</h2>\
            <div class="form-group">\
                <label for="usn">Username:</label>\
                <input class="form-control" type="text" name="username" value="paul">\
            </div>\
            <div class="form-group">\
                <label for="pwd">Password:</label>\
                <input class="form-control" type="text" name="password" value="paul">\
            </div>\
            <button type="submit" class="btn btn-default" id="login-button">Login</button>\
        </form>\
        <br>\
        <hr  style="border-color: #919191;">\
        <br>\
        <form id="signup-form" method="post">\
             <h2>Sign up</h2>\
             <div class="form-group">\
                <label for="usn">Username:</label>\
                <input class="form-control" type="text" name="username">\
            </div>\
            <div class="form-group">\
                <label for="pwd">Password:</label>\
                <input class="form-control" type="password" name="password1" >\
            </div>\
            <div class="form-group">\
                <label for="pwd">Confirm Password:</label>\
                <input class="form-control" type="password" name="password2" >\
            </div>\
            <button type="submit" class="btn btn-default" id="signup-button">SignUp</button>\
        </form>\
        <br>\
    </div>'
})

var temp = Vue.extend({
    template: '<h1>hello</h1>'
})

var temp2 = Vue.extend({
    template: '<h1>hello22</h1>'
})

router.map({
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
    '/login': {
        component: Login
    }
});

$(window).on('load', function() {
    console.log('hello')
    router.start(App, '#container'); 
});
