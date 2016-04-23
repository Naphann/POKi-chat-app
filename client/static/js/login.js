$('form#login-form').submit(function() {
    $.post({
        url: POKi.getLocation() + '/login',
        type: 'POST',
        data: $("form#login-form").serializeArray(),
        dataType : 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
    return false;
});
