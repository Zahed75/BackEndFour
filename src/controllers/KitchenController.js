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

// Update Brand/Outlet Status

exports.updateBrand = (req, res) => {
    let id = req.params.id;
    console.log("id check", id)
    let outletStatus = req.params.outletStatus;
    console.log("status check", outletStatus)
    let Query = {_id: id};
    let reqBody = {outletStatus: outletStatus};
    KitchenModel.updateOne(Query, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "Something Wrong", data: err})
        } else {
            res.status(200).json({status: "Outlet Status Updated", data: data})
        }
    })
}


//Delete Brand

exports.deleteBrand = (req, res) => {
    let id = req.params.id;
    let Query = {_id: id};
    KitchenModel.remove(Query, (err, data) => {
        if (err) {
            res.status(400).json({status: "Could Not Delete Brand", data: err})
        } else {
            res.status(200).json({status: "Brand Removed", data: data})
        }
    })
}

// Brand Search by Name

exports.searchBrand = (req, res) => {
    let brandName = req.params.brandName;
    let phone = req.headers['phone'];
    KitchenModel.aggregate([
        {$match: {brandName: brandName, phone: phone}},
        {
            $project: {
                _id: 1, ownerName: 1, brandName: 1, outlet: 1, outletStatus: 1,
                brandCreatedDate: {
                    $dateToString: {
                        date: "$brandCreated",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({status: "Could not Found The Brand", data: err})
        } else {
            res.status(200).json({status: "Brand Found SuccessFully!", data: data})
        }
    })
}

