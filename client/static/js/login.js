function login() {
    $.post({
        url: POKi.getLocation() + '/login',
        type: 'POST',
        data: $("form#login-form").serializeArray(),
        dataType : 'json',
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
