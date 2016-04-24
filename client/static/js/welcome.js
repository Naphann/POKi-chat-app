function welcome(){
    return "Welcome.";
};

welcome.up = function() {
    if(this.html == undefined)
        $.get("./views/welcome.html").done(function(response) {
            this.html = response;
            $("#container").hide().html(this.html).fadeIn("slow");
        });
    else {
        // $("#welcome-style").prop('disabled', false);
        $("#container").hide().html(this.html).fadeIn("slow");
    }
}

welcome.serverDown = function() {
    $("#spinner").fadeOut("slow",function() {
        $("#down-status").fadeIn("slow");
    });
}

welcome.down = function() {
    $("#container").empty();
    $("#welcome-style").prop('disabled', true);
}

$(window).load(function(){
    // welcome.up();
});
