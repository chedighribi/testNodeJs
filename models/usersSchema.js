const mongoose = require ('mongoose')

const schema = mongoose.Schema

const usersSchema = new schema ({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    birthday :{
        type : String
    },
    email : {
        type : String,
    },
    city : {
        type : String,
    },
    playOn : {
        type : String,
    },
    score : {
        type : Number,
    }

})

module.exports = users = mongoose.model ('users',usersSchema)
