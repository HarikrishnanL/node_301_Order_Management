// import models
const Order = require('../models/OrderModel');
const logger = require('../utils/logger');
const orderStatus = require('../domain/enumerations/orderStatus');

exports.getOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error("Failed to reterive order")
        } else {
            return order;
        }
    } catch (error) {
        throw error;
    }
};

exports.getOrders = async (currentPage) => {
    const perPage = 10;
    try{
        const totalOrders = await Order.find().countDocuments();
        const orders = await Order.find().skip((currentPage - 1) * perPage).limit(perPage);
        return {
            "orders":orders,
            "totalOrders":totalOrders
        }

    }catch(error){
        throw error 
    }
 };

exports.postOrder = async (body, customer, restaurant) => {
    try {
        let cart = []
        body.menu.map(item => {
            item.cummulativePrice = item.price * item.quantity;
            cart.push(item)
        })

        let totalPrice = cart.reduce((acc, item) => acc + item.cummulativePrice, 0)
        const order = new Order({
            user: customer,
            restaurant: restaurant,
            orderedMenu: cart,
            "totalPrice": totalPrice,
            orderStatus:orderStatus.ORDER_PLACED
        })
        await order.save();
        return order;

    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

exports.updateOrder = async (body,orderId)=>{
    try{
        const order = await Order.findById(orderId);
        let cart = []
        body.menu.map(item => {
            item.cummulativePrice = item.price * item.quantity;
            cart.push(item)
        })

        let totalPrice = cart.reduce((acc, item) => acc + item.cummulativePrice, 0);
        order.orderedMenu = cart;
        order.totalPrice = totalPrice;
        order.orderStatus = orderStatus.ORDER_UPDATED
        return await order.save(); 
    }catch(error){
        throw error ;
    }
}

exports.updateOrderStatus = async (body,orderId)=>{
    try{
        const order = await Order.findById(orderId);
        order.orderStatus  = body.status;
        return await order.save();

    }catch(error){
        throw error;
    }
}

exports.deleteOrder = async (orderId)=>{
    try{
        await Order.findByIdAndRemove(orderId);
        return true ;
    }catch(error){
        throw error ;
    }
}