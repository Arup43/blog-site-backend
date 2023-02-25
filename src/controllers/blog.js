const BlogModel = require('../models/Blog');

exports.createBlog = (req, res) => {
    const reqBody = req.body;
    reqBody.email = req.headers.email;
    BlogModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    
    BlogModel.remove({_id: id}, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.updateBlog = (req, res) => {
    const id = req.params.id;
    const updatedDate = Date.now();
    const reqBody = req.body;
    reqBody.updatedDate = updatedDate;
    BlogModel.updateOne({_id: id}, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.getBlogsByEmail = (req, res) => {
    const email = req.headers.email;
    BlogModel.aggregate([
        {$match: {email: email}},
        {$project: {_id: 1, title: 1, author: 1, content: 1, createdDate: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdDate" }
        }}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.getAllBlogs = (req, res) => {
    BlogModel.aggregate([
        {$project: {_id: 1, title: 1, author: 1, content: 1, createdDate: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdDate" }
        }}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};