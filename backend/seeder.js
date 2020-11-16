const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

// Loads models
const Product = require('./models/Product');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Order.deleteMany();

        console.log('destroyed with success...')
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
}