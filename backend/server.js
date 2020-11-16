const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUplaod = require('express-fileupload');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const connectDB = require('./config/db');
const path = require('path');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const products = require('./routes/products');
const orders = require('./routes/orders');
const auth = require('./routes/auth');
const users = require('./routes/users');

// middlewere
app.use(express.json())
app.use(express.static('public'))
app.use(fileUplaod())
app.use(cookieParser())

// morgan middleweare
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// connect to DB
connectDB()

// Mount routers
app.use('/api/products', products)
app.use('/api/orders', orders)
app.use('/api/auth', auth)
app.use('/api/users', users)

// Serve static in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} on Port ${PORT}`))


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(() => process.exit(1));
});