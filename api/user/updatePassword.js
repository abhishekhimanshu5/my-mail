import { createOtp, verifyOtp } from "../../jobs/createOtpAndVerify.js";
import bcrypt from 'bcrypt';
import User from "../../src/models/userModel.js";
import signOut from "./signOut.js";

export const generateOtpForPassword = async (req,res) => {

    const newPassword = req.headers['newpassword']
    //console.log(newPassword);

    if(!newPassword || newPassword.length < 6){
        
        res.send('invalid password format');
    }else{
        const userData = {
            "userId" : req.headers.userid,
            "newPassword" : newPassword,
        }
        const isOtpGenerated = await createOtp(userData,'Password Update')
       // console.log(isOtpGenerated)
        if(isOtpGenerated){

            await verifyOtp(req.headers.userid,)
            res.write("otp generated....");
            res.write("check your mail");
            res.end();
        }else{
            res.send("otp generation failed");
        }
    }
}
export const verifyOtpForPassword = async(req,res,next) => {

    const {userid,otp} = req.headers;

    const isOtpVerifiedAndGotNewPassword = await verifyOtp(userid,otp);

    if(isOtpVerifiedAndGotNewPassword){
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(isOtpVerifiedAndGotNewPassword,salt);

        await User.findOneAndUpdate(
            {
                "_id" : userid
            },
            {
                "password" : hashedPassword
            }
        )

        //res.send("password updated successfully")
        req.passwordUpdate = true;
        signOut(req,res);
    }else{
        res.send("failed to verify otp");
    }

}
