const mongoose = require("mongoose")
const {
    Schema
} = mongoose;

const OrderSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    record: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Record"
    }], //an array here so u can order as many records as u want
    createAt: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Order", OrderSchema)