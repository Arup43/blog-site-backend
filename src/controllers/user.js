const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.registration = (req, res) => {
    const reqBody = req.body;
    UserModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.login = (req, res) => {
    const reqBody = req.body;
    UserModel.aggregate([
        {$match: {email: reqBody.email, password: reqBody.password}},
        {$project: {_id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: 'failed', data: err });
        } else {
            if(data.length > 0) {
                let payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0].email};
                let token = jwt.sign(payload, process.env.JWT_SECRET);
                res.status(200).json({ status: 'success', token: token, data: data[0] });
            } else {
                res.status(401).json({status: "unauthorized"})
            }
        }
    });
};
