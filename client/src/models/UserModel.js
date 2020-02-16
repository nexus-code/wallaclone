export default class UserModel {
    id;
    username;
    email;
    token;
    language;

    constructor(value) {
        this.id = value._id;
        this.username = value.username;
        this.email = value.email;
        this.token = value.token;
        this.language = value.language;
    }
}