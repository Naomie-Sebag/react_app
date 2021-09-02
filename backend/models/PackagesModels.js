const mongoose = require('mongoose')

const package = new mongoose.Schema({

    distribution_date: {
        type:Date,
        default: Date.now
    },

    receiver_name: { 
        type:String,
        required: true
    },

    latitude: {
        type:Number,
        required: true
    },

    longitude: {
        type:Number,
        required: true
    },
    
    address: {
        type:String,
        required: true
    },

    IsDistributed: {
        type:String,
        default:false
    },

    AssignedTo: {
        type:String,
        default: ""
    }

})

module.exports = mongoose.model('packages', package)