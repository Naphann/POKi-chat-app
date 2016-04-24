function loadScript(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                if(callback != undefined)
                    callback();
            }
        };
    } else {
        script.onload = function(){
            if(callback != undefined)
                callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("load",url);
}
