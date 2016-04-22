$(document).ready(function(){
    var allList = new Vue({
    el: '#all-list',
    data: {
        items: [
            { name: 'SA Room'  },
            { name: 'Dis Sys Room' },
            { name: 'TechWrite Room' },
            { name: 'CP40 Room' },
            { name: 'CP40.5 Room' },
            { name: 'SensorTech Room'  },
            { name: 'Teacup Room'  }
        ]
    }
    })
});