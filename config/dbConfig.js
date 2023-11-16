const mongoose = require("mongoose")

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongodb")
        
    } catch (err) {
        console.log("mongoose errora \n "+err )
    }
}

module.exports = connect