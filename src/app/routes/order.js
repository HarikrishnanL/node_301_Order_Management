const express  = require('express');
const router = express.Router();


const orderController = require("../controllers/orderController");

//import session validator
const authSessionValidator = require('../utils/sessionValidatorUtils');

router.post("/order/customer/:userId/restaurant/:restaurantId/",authSessionValidator.sessionAuthValidator,orderController.createOrder);

router.get("/order/single/:orderId",authSessionValidator.sessionAuthValidator,orderController.getOrder);

router.get("/order/all",authSessionValidator.sessionAuthValidator,orderController.getOrders);

router.put("/order/:orderId",authSessionValidator.sessionAuthValidator,orderController.updateOrder);

router.patch("/order/:orderId",authSessionValidator.sessionAuthValidator,orderController.updateOrderStatus);

router.delete("/order/:orderId",authSessionValidator.sessionAuthValidator,orderController.deleteOrder);



module.exports = router;

