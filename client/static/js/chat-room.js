$(document).ready(function(){
    var roomName = decodeURIComponent(getUrlVars()['room']);
    if(roomName)
        $('#page-tite span').html(roomName);
        
    var msgList = new Vue({
        el: '#msg-list',
        data: {
            items: [
                { username: 'Paul', pos: 'left', message:'Hello POKI.', time: '9:45 AM' },
                { username: 'IngIng', pos: 'left', message:'Hello Word.', time: '9:46 AM' },
                { username: 'Omar', pos: 'left', message:'Hello DisSys.', time: '9:47 AM' },
                { username: 'Kim', pos: 'right', message:'Hello Friends.', time: '9:48 AM' },
                { username: 'Paul', pos: 'left', message:'Good luck.', time: '9:49 AM' },
            ]
        }
    });
    new Vue({
        el: '#add-msg-box',
        data: {
            newMsgInput: ''
        },
        methods: {
            addMsg: function () {
                var msg = this.newMsgInput.trim()
                if (msg) {
                    msgList.items.push( { username: 'Kim', pos: 'right', message: msg , time: '9:50 AM' })
                    this.newMsgInput = ''
                }
            }
        }
     });
     
     
     function getUrlVars()
    {
        var vars = [], hash;
        var hashes = $(location).attr('href').slice($(location).attr('href').indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
     
     
});