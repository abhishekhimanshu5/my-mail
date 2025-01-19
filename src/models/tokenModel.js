import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token : {
        type : String,
        required : true
    }
})

const Token = mongoose.model('Token',tokenSchema,'blacklisttokens');

export default Token;