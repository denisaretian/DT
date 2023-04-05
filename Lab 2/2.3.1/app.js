var app = new Vue({
    el: '#app',
    data: {
        message: ''
    },
    methods: {
        process: function(){
            console.log(this.message);
            if(this.message == "123"){
                console.log("the message is 123");
            }
        }
    }
})