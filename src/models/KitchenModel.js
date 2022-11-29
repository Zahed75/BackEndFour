const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    ownerName: {type: String},
    brandName: {type: String, unique: true, max: 20},
    subdomain: {type: String, unique: true, max: 30},
    brandImage: {type: String},
    outlet: {type: String},
    outletStatus: {type: String},
    phone: {type: String},
    brandCreated: {type: Date, default: Date.now()}



}, {versionKey: false})

const BrandModel = mongoose.model('brands', DataSchema)
module.exports = BrandModel