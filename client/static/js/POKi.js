function POKi() {
    this.isStart = false;
    console.log("POKi Chat Application Core.");
};

// ############################################
//                 Core Methods
// ############################################
// initial - serverList ["url", "url", ...]
POKi.init = function(serverList) {
    this.endTest = 0;
    this.serverList = serverList;
    this.connecting = [];
    this.serverList.forEach(function(server) {
        var socket = io("http://" + server);
        socket.location = "http://" + server;

        socket.on('connect_error', function() {
            console.log("Socket to",server,"is closed.");
            socket.close();
            POKi.endTest++;
        });

        socket.on('connect', function() {
            socket.emit('ack');
            console.log("Connected to",server);
            POKi.endTest++;
        });

        socket.on('disconnect', function() {
            if(socket.isMaster) {
                POKi.retry();
            }
        });

        socket.on('master', function() {
            socket.isMaster = true;
            POKi.masterServer = socket;
            console.log("Found Master @",server);
        });

        socket.on('slave', function(response) {
            socket.isMaster = false;
            console.log("Found Slave @",server);
            socket.close();
        });
        POKi.connecting.push(socket);
    });
    return this;
};


// ############################################
//                Utils Methods
// ############################################
// Refresh all disconnected server
// Can be used with .onReady(success,fail)
POKi.refreshAll = function() {
    console.log("refresh all");
    this.endTest = 0;
    this.connecting.forEach(function(socket) {
        if(!socket.connected)
            socket.connect();
    });
    return this;
};

// Use when master is disconnected.
// Refresh by set retrying interval every 3 seconds for 10 times
POKi.retry = function(success, fail) {
    if(POKi.isRetrying)
        return;
    POKi.isRetrying = true;
    var retryTime = 0;
    function retryLoop() {
        retryTime++;
        console.log("Connection lost. Retrying...",retryTime);
        POKi.refreshAll().onReady(function() {
            POKi.isRetrying = false;
            clearInterval(retryInterval);
            if(success != undefined)
                success();
        },function() {
            if(retryTime >= 10) {
                POKi.isRetrying = false;
                clearInterval(retryInterval);
                if(fail != undefined)
                    fail();
            }
        });
    }
    retryLoop();
    var retryInterval = setInterval(retryLoop, 3000);
};

// ############################################
//                  Get Methods
// ############################################
// Return master server socket
POKi.getMaster = function() {
    return this.masterServer;
};

// Return master server location ("http://...")
POKi.getLocation = function() {
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
POKi.getUser = function() {
    var user = false;
    $.ajax({
        type: "POST",
        async: false,
        url : POKi.getLocation() + "/login/getUser",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            user = response;
        },
    });
    return user;
}


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
// TRUE - Logged In
POKi.isLoggedIn = function() {
    var flag = false;
    $.ajax({
        type: "GET",
        async: false,
        url : POKi.getLocation() + "/login/check",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(response) {
            flag = response;
        },
    });
    return flag;
}

// ############################################
//                Promise Methods
// ############################################
POKi.onReady = function(success, fail) {
    this._checkInterval = setInterval(function() {
        if(POKi.ready()) {
            clearInterval(POKi._checkInterval);
            if(success != undefined)
                success();
        }
        else if(POKi.endTest == POKi.serverList.length && POKi.isDisconnected()){
            clearInterval(POKi._checkInterval);
            if(fail != undefined)
                fail();
        }
    },100);
}
