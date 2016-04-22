$(document).ready(function(){
    var joinedList = new Vue({
    el: '#joined-list',
    data: {
        items: [
        { name: 'SA Room' , new_msg : '16 New' },
        { name: 'Dis Sys Room' , new_msg : '13 New' },
        { name: 'TechWrite Room' , new_msg : '13 New' },
        { name: 'CP40 Room' , new_msg : '13 New' },
        { name: 'CP40.5 Room' , new_msg : '13 New' },
        { name: 'SensorTech Room' , new_msg : '13 New' },
        { name: 'Teacup Room' , new_msg : '19 New' }
        ]
    }
    })
});