const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sneakerSchema = new Schema({
    name: {type: String, required: true},
    actualPrice: {type: Number, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    rating: {type: Number},
    index: {type: Number},
    width: {type: Number},
    height:{type: Number},
    slug: {type: String},
    discountPrice: {type: Number},
    discount: {type: Number},
    banner: {type: String, required: true},
}, {timestamps: true})

const sneakerModel = mongoose.models.Sneaker || mongoose.model('Sneaker', sneakerSchema)


module.exports = sneakerModel