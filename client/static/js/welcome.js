var Welcome = Vue.extend({
    template:
        '<img id="logo" src="./static/img/poki.png" alt="POKI Picture">\
        <div class="loader">\
            <i id="spinner" class="fa fa-spinner fa-spin fa-fw fa-3x" aria-hidden="true"></i>\
            <span id="down-status" class="status" style="display:none;">Unfortunately, Server is down. <a href="#" v-on:click="retry($event)">Retry</a></span>\
        </div>',
    methods: {
        retry: function(event) {
            event.preventDefault();
            $("#down-status").fadeOut("fast",function() {
                $("#spinner").fadeIn("fast",function() {
                    POKi.retry(function() {
                        Welcome.serverConnect();
                    },function() {
                        Welcome.serverDown();
                    });
                });
            });
        }
    }
});

Welcome.serverConnect = function() {
    $("#spinner").fadeOut("fast",function() {
        if(POKi.isLoggedIn())
            router.go("/joined-room");
        else Login.toggle();
    });
}

Welcome.serverDown = function() {
    $("#spinner").fadeOut("fast",function() {
        $("#down-status").fadeIn("fast");
    });
}
