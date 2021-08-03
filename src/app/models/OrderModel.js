const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Object,
        required: true
    },
    restaurant: {
        type: Object,
        required: true
    },
    orderedMenu: [{
        dish: { type: String, required: true },
        price: { type: Number, required: true },
        quantity:{type:Number,required:true},
        cummulativePrice: { type: Number, required: true },

    }],
    totalPrice: { type: Number, required: true },
    orderStatus:{ type: String, required: true },
});


module.exports = mongoose.model('Order', orderSchema);