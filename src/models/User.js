const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    photo: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
}, {versionKey: false});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;