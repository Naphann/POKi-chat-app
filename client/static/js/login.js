var mydebug;
var Login = new Vue({
    el: "#login-modal",
    data: {
        mode: "login",
        toggleButton: "Don't have account?",
        submitButton: "LogIn",
    },
    methods: {
        toggleMode: function(mode) {
            if(mode == "login") {
                this.mode = "signup";
                this.toggleButton = "Already have account?";
                this.submitButton = "SignUp";
                $(this.$el).find("#displayName").slideDown().find("input").prop('disabled',false);
            }
            else {
                this.mode = "login";
                this.toggleButton = "Don't have account?";
                this.submitButton = "Login";
                $(this.$el).find("#displayName").slideUp().find("input").prop('disabled',true);
            }
        },
        send: function(event,mode) {
            mydebug = this;
            event.preventDefault();
            if(mode == "login") {
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
                        if(response) {
                            Login.toggle();
                            toastr.success("Logged In.");
                            router.go("/joined-room");
                        }
                        else {
                            toastr.error("Invalid username or password.");
                        }
                    },
                    error: function(error) {
                        toastr.warning("Server is disconnected.");
                    }
                });
            }
            else if(mode == "signup") {
                this.mode = "login";
                this.toggleButton = "Don't have account?";
                this.submitButton = "Login";
                $(this.$el).find("#displayName").slideUp().find("input").prop('disabled',true);
            }
        }
    }
});

Login.toggle = function() {
    $('#login-modal').modal('toggle');
}

Login.disableSignUp = function() {
    $('#login-modal').find("#displayName").remove();
    $('#login-modal').find("#toggleButton").remove();
}
