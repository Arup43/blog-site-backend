const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() },
    email: { type: String, required: true },
}, {versionKey: false});

const BlogModel = mongoose.model('blogs', blogSchema);
module.exports = BlogModel;