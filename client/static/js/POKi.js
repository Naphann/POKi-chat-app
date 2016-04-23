function POKi() {
    console.log("POKi Chat Application Core.");
};

// ############################################
//                 Core Methods
// ############################################
// initial - serverList ["url", "url", ...]
POKi.init = function(serverList) {
    this.serverList = serverList;
    this.connecting = [];
    this.serverList.forEach(function(server) {
        var socket = io("http://" + server);
        socket.isMaster = false;
        socket.location = "http://" + server;

        socket.on('connect_error', function() {
            socket.close();
        });

        socket.on('connect', function() {
            socket.emit('ack');
            console.log("Connected to",server);
        });

        socket.on('disconnect', function() {
            if(socket.isMaster) {
                POKi.refreshSlave();
            }
        });

        socket.on('master', function() {
            socket.isMaster = true;
            POKi.masterServer = socket;
            console.log("Found Master @",server);
        });

        socket.on('slave', function(response) {
            socket.close();
        });
        POKi.connecting.push(socket);
    });
};


// ############################################
//                Utils Methods
// ############################################
// Refresh all disconnected server
POKi.refreshAll = function() {
    this.connecting.forEach(function(socket) {
        if(!socket.connected)
            socket.connect();
    });
};

// Refresh slave server
POKi.refreshSlave = function() {
    console.log("Connecting to slave servers...");
    this.connecting.forEach(function(socket) {
        if(!socket.isMaster)
            socket.connect();
    });
};

// Refresh by set retrying interval every 3 seconds for 10 times
POKi.retry = function() {
    var retryTime = 0,
        retryInterval = setInterval(function () {
            retryTime++;
            if(!POKi.ready()) {
                console.log("Connection lost. Retrying...",retryTime);
                POKi.refreshAll();
                if(retryTime >= 10) {
                    console.log("Disconnected.");
                    clearInterval(retryInterval);
                }
            }
            else {
                console.log("Server okay.");
                clearInterval(retryInterval);
            }
        }, 3000);
};

// ############################################
//                  Get Methods
// ############################################
// Return master server location ("http://...")
POKi.getLocation = function() {
    if(!this.ready())
        this.refresh();
    return this.masterServer.location;
};

// Return Object Status of All Server
POKi.status = function() {
    var status = [];
    this.connecting.forEach(function(socket,index) {
        status = status.concat([{
            "id" : index,
            "location" : socket.location,
            "master" : socket.isMaster,
            "connected" : socket.connected,
        }]);
    });
    return status;
};


// ############################################
//                 Check Methods
// ############################################
// TRUE - when connected to Master
POKi.ready = function() {
    return (this.masterServer != undefined && this.masterServer.connected);
};

// TRUE - when disconnected to all server
POKi.isDisconnected = function() {
    var connected = false;
    this.connecting.forEach(function(socket) {
        connected = connected || socket.connected;
    });
    return !connected;
};
POKi.loggedIn = function() {
    $.ajax({
        type: "GET",
        url : POKi.getLocation() + "/login/check",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            console.log(response);
        },
    });
}

$(window).load(function() {
    POKi();
    POKi.init([
        "localhost:3000",
        "localhost:3001",
    ]);
});
