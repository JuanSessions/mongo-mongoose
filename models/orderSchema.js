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
    }], //an array here so they can order as many records as they want in one order
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", OrderSchema)