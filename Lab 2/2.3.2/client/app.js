var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null
    },
    created: function () {
        this.usersService = users();
        this.usersService.get().then(response => (this.users = response.data));
    },
    methods: {
        removeUser: function (index) {
            this.usersService.remove(index).then(response => {
                console.log(response.data);
                this.userService.get().then(response => (this.users = response.data));
            });
        },

        saveUser: function(user){
            this.usersService.save(user).then(response =>{
                console.log(response.data);
                this.userService.get().then(response => (this.users = response.data));
            });
        },

        updateUser:function(user){
            this.usersService.update(user).then(response =>{
                console.log(response.data);
                this.usersService.get().then(response => (this.users = response.data));
            });
        }

    }
})