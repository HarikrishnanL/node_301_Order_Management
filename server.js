require('dotenv').config();
const app = require("./index");
const mongoose = require('mongoose');

const port = process.env.port || 3000;

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(connection => {

        console.log('database connection established ====>');
        const server = app.listen(port);
        const io = require('./src/app/utils/socket').init(server);
        io.on('connection', socket => {
            console.log('Client connected try once again')
        })
    })
    .catch(err => console.log('error connecting to a mongodb database', err));