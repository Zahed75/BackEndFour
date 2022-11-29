const KitchenModel = require("../models/KitchenModel");
const express = require("express");


// Brand Create

exports.createBrand = (req, res) => {
    let reqBody = req.body;
    reqBody.phone = req.headers['phone']
    KitchenModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "Couldn't Create the Brand", data: err})
        } else {
            res.status(200).json({status: "Your Brand is Created!", data: data})
        }
    })
}