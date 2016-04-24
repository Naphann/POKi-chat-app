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
            alert("Send in mode " + mode);
            if(mode == "signup") {
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
