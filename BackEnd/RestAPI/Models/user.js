const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


//users collection
const userSchema  = new mongoose.Schema(
    {
        UserName: String,
        Email: String,
        Address:String,
        PhoneNumber:Number,
    }
)

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;