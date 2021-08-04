const orderService = require("../services/orderService");
const apiResponse = require("../helpers/apiResponse");
const fetchCustomerApi = require('../domain/service/fetchCustomerApi');
const fetchRestaurantApi = require('../domain/service/fetchRestaurantApi');
const io = require('../../app/utils/socket');

exports.createOrder = async (req,res)=>{
    try{
        const token = req.user.token;
        const customer = await fetchCustomerApi.getCustomer(req.params.userId, token);
        const restaurant = await fetchRestaurantApi.getRestaurant(req.params.restaurantId, token);
        const order = await orderService.postOrder(req.body,customer,restaurant);
        io.getIO().emit('orders',{"order_details":order});
        return apiResponse.successResponseWithData(res,"Order received successfully",order);
    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.getOrder = async (req,res)=>{
    try{
        const order = await orderService.getOrder(req.params.orderId);
        return apiResponse.successResponseWithData(res,"Order reterived successfully",order);
    }catch(error){
        return apiResponse.customErrorResponse(res, error.message,404);
    }
}

exports.getOrders = async (req,res)=>{
    try{
        const currentPage = req.query.page || 1;
        const orders = await orderService.getOrders(currentPage);
        return apiResponse.successResponseWithData(res," All Order reterived successfully",{Orders:orders.orders,totalOrders:orders.totalOrders});

    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.updateOrder = async (req,res)=>{
    try{
        const order = await orderService.updateOrder(req.body,req.params.orderId);
        return apiResponse.successResponseWithData(res,"Order updated successfully",order);
    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.updateOrderStatus = async (req,res)=>{
    try{
        const order = await orderService.updateOrderStatus(req.body,req.params.orderId);
        return apiResponse.successResponseWithData(res,"Order status updated successfully",order);
    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}

exports.deleteOrder = async (req,res)=>{
    try{
        const order = await orderService.deleteOrder(req.params.orderId);
        return apiResponse.successResponseWithData(res,"Order delete updated successfully",order);

    }catch(error){
        return apiResponse.errorResponse(res, error.message);
    }
}