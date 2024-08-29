const mongoose=require("mongoose");

const UserSchma=new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
})
const UserModel=mongoose.model("users",UserSchma)
 module.exports=UserModel;