function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }

    remove = function(index){
        return axios.delete("http://localhost:3000/users" + index);
    }

    save = function(user){
        return axios.post("http://localhost:3000/users", user);

    }

    update = function(user){
        return axios.put("http://localhost:3000/users"+user.index, user);
    }
    return {
        get: get,
        remove : remove,
        save : save,
        update: update
    }
}