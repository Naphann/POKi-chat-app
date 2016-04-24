$(window).load(function() {
    router.go('/');
    POKi();
    POKi.init([
        "localhost:3000",
        "localhost:3001",
    ]).onReady(function() {
        setTimeout(Welcome.serverConnect,700);
    },function() {
        Welcome.serverDown();
    });
});
