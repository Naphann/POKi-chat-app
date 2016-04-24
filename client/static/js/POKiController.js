$(window).load(function() {
    POKi();
    POKi.init([
        "localhost:3000",
        "localhost:3001",
    ]).onReady(function() {
        console.log("initialize completed..");
        router.go('/login')
    },function() {
        welcome.serverDown();
    });
});
