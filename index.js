const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// importing routes
const Order = require("./src/app/routes/order");


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(morgan("dev"));
app.use(express.json());

app.set('port', process.env.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to order service microservices" });
});

app.get("/order-management", (req, res) => {
    // res.json({ message: "Welcome to order service microservices" });
    res.render('order/index.ejs');
});

// routes
app.use("/order-management", Order);

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});

module.exports = app;