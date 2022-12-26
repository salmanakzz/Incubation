// mongoose connection setup file

const mongoose = require("mongoose")

module.exports.connect = function(callback){
    const url = process.env.MONGODB_URL
    const dbname = 'incubation'

    mongoose.connect(url+'/'+dbname,(err) => {
        if (err){
            return callback(err)
        }
        callback()
    })
    
}