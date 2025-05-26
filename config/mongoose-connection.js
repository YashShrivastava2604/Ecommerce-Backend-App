const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const config = require('config');

mongoose.connect(`${config.get("MONGODB_URI")}/ecommerce-app1`)
.then(() => {
    dbgr("connected to database")
}).catch((err) => {
    dbgr("error connecting to database", err)
})

module.exports = mongoose.connection;

// To check if `DEBUG=development:*` is working, you can run your application with the `DEBUG` environment variable set. 
// For example, in your terminal, run:
// DEBUG=development:* node /d:/Yash/Web\ Dev/Backend/e-commerce\ app1/config/mongoose-connection.js
// If `DEBUG` is working, you should see the debug messages (e.g., "connected to database" or "error connecting to database") in the terminal.