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
                            toastr.success("Logged In.");
                            router.go("/joined-room");
                            var user = POKi.getUser();
                            USERID = user.id;
                            USERNAME = user.username;
                            DISPLAYNAME = user.display;
                            Login.toggle();
                        }
                        else toastr.error("Invalid username or password.");
                    },
                    error: function(error) {
                        toastr.warning("Server is disconnected.");
                    }
                });
            }
            else if(mode == "signup") {
                $.post({
                    url: POKi.getLocation() + '/register',
                    type: 'POST',
                    data: $("form#login-form").serializeArray(),
                    dataType : 'json',
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(response) {
                        if(response) {
                            toastr.success("Logged In.");
                            var user = POKi.getUser();
                            USERID = user.id;
                            USERNAME = user.username;
                            DISPLAYNAME = user.display;
                            this.mode = "login";
                            this.toggleButton = "Don't have account?";
                            this.submitButton = "Login";
                            $(this.$el).find("#displayName").slideUp().find("input").prop('disabled',true); // BUG!!!
                            Login.toggle();
                            router.go("/joined-room");
                        }
                        else toastr.error("Already have this username.");
                    },
                    error: function(error) {
                        toastr.warning("Server is disconnected.");
                    }
                });
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
