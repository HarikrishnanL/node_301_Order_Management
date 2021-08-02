const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// importing routes


const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.set('port',process.env.port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to cutomer service microservices" });
});

app.get("/order-management", (req, res) => {
    res.json({ message: "Welcome to cutomer service microservices" });
});

// routes

app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint")
});

module.exports = app;