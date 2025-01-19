
import mongoose from "mongoose";

const otpModel = mongoose.Schema({
    otp : {
        type : Number,
        minLength : 6,
        maxLength : 6,
        required : true,
    },
    userId : {
        type : String,
        required : true,
    },
    for : {
        type : String,
        required : true,
    },
    newPassword : {
        type : String,
        default : null
    }
},{
    timestamps : true,
})

const OTPmodel = mongoose.model('OTPmodel',otpModel,'otp');
export default OTPmodel;