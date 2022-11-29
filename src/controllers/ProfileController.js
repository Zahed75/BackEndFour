const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');

//User Reg/Create

exports.registartion = (req, res) => {
    let reqBody = req.body
    UserModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "Failed", data: err})
        } else {
            res.status(200).json({status: "User Create SuccessFully", data: data})
        }
    })
}


//User Login
exports.Login = (req, res) => {
    let reqBody = req.body
    UserModel.aggregate([
        {$match: reqBody},
        {$project: {_id: 0, phone: 1, firstName: 1, role: 1, bloodGroup: 1}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({status: "Failed", data: err})
        } else {
            if (data.length > 0) {
                let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['phone']}
                let token = jwt.sign(Payload, 'SecretKey123456789')
                res.status(200).json({status: "Login Success", token: token, data: data[0]})
            } else {
                res.status(401).json({status: "Unauthorized!"})
            }
        }
    })
}


// User Profile Update


exports.ProfileUpdate = (req, res) => {
    let phone = req.headers['phone']
    let reqBody = req.body;
    UserModel.updateOne({phone: phone}, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "User Didn't Found!", data: err})
        } else {
            res.status(200).json({status: "Your Profile has been Updated!", data: data})
        }
    })
}

// Manage List of All User Data

exports.getUserData = (req, res) => {

    UserModel.find({}, (err, data) => {
        if (err) {
            res.status(401).json({status: "Failed", data: err})
        } else {
            res.status(200).json({status: "All User List!", data: data})
        }
    })

}