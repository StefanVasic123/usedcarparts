class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true;
        cb()
    }

    logout(cb) {
        this.authenticated = false;
    }

    isAuthenticated() {
        if(localStorage.getItem('userId') && localStorage.getItem('token')) {
            return this.authenticated = true;
        }
        return this.authenticated;
    }
}

export default new Auth();