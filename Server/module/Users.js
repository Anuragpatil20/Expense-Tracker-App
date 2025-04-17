const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    title:String,
    amount:String,
    category:String,
    expenseDate:String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel