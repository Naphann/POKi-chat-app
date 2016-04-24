var Welcome = Vue.extend({
    template:
        '<img id="logo" src="./static/img/poki.png" class="img-sm" alt="POKI Picture">\
        <div class="loader">\
            <i id="spinner" class="fa fa-spinner fa-spin fa-fw fa-3x" aria-hidden="true"></i>\
            <span id="down-status" class="status" style="display:none;">Unfortunately, Server is down.</span>\
            <span id="welcome-status" class="status" style="display:none;">Welcome.!!</span>\
        </div>'
});

Welcome.serverConnect = function() {
    $("#spinner").fadeOut("slow",function() {
        $("#welcome-status").fadeIn("slow",function() {
            Login.toggle();
        })
    });
}

Welcome.serverDown = function() {
    $("#spinner").fadeOut("slow",function() {
        $("#down-status").fadeIn("slow");
    });
}

Welcome.down = function() {
    $("#container").empty();
    $("#welcome-style").prop('disabled', true);
}
