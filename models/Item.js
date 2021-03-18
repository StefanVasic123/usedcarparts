const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    manufacturer: [{
        type: String,
        required: true
    }],
    model: [{
        type: String
    }],
    productionYear: [{
        type: String
    }],
    subType: [{
        type: String
    }],
    gas: [{
        type: String
    }],
    cc: [{
        type: String
    }],
    horsePower: [{
        type: String
    }],
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = Item = mongoose.model('item', ItemSchema);