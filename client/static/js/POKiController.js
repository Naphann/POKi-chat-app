$(window).load(function() {
    router.go('/');
    POKi();
    POKi.init([
        "192.168.137.147:3000",
        "192.168.137.147:3001",
    ]).onReady(function() {
        setTimeout(Welcome.serverConnect,300);
        launchSocket();
    },function() {
        Welcome.serverDown();
    });
});
