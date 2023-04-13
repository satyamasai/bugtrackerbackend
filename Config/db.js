// require("dotenv").config()
 const mongoose = require("mongoose")
 require('dotenv').config()
const connection = mongoose.connect(process.env.server_url)
module.exports={
    connection
}