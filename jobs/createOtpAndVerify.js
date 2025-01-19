import OTPmodel from "../src/models/otpModel.js";
import autoMailSender from "./autoMailSender.js";

export const createOtp = async (userData,purpose) => {

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //console.log("calling create otp")
    const mailData = {
        "receiverId" : userData.userId,
        "subject" : `MyMail : OTP for ${purpose}`,
        "body" : `One Time Password for ${purpose} is : ${otp}, Please don't share with anyone.`,
    }
   // console.log("mail created")

    const isMailSent = await autoMailSender(mailData);

    //console.log("mail sent value : "+isMailSent);

    if(isMailSent){
        const otpExist = await OTPmodel.findOne({'userId':userData.userId});
        if(!otpExist){
            try{
                let data = null
                if(userData.newPassword){
                     data = {
                        "otp" : otp,
                        "userId" : userData.userId,
                        "for" : purpose,
                        "newPassword" : userData.newPassword
                    }
                }
                else{
                     data = {
                        "otp" : otp,
                        "userId" : userData.userId,
                        "for" : purpose,
                    }
                }

                await OTPmodel.create(data);
                return true;

            }catch(err){
                return false
            }
        }else{
            try {

                let data = null
                if(userData.newPassword){
                     data = {
                        "otp" : otp,
                        "userId" : userData.userId,
                        "for" : purpose,
                        "newPassword" : userData.newPassword
                    }
                }
                else{
                     data = {
                        "otp" : otp,
                        "userId" : userData.userId,
                        "for" : purpose,
                    }
                }

                await OTPmodel.findOneAndUpdate(
                    {
                        "userId":userData.userId
                    },
                    data,
                )
                return true;
                
            } catch (error) {
                return false;
            }
        }
    }else{
        return false;
    }

}

export const verifyOtp = async (userId,otp) => {

    //console.log(userId+" "+otp)
    const OTPdata = await OTPmodel.findOne({"userId":userId});
    //console.log(OTPdata)
    //console.log(OTPdata.otp);
    if(OTPdata){

        if(OTPdata.otp == otp){
            const value =  OTPdata.newPassword || true;
            await OTPmodel.findOneAndDelete({"userId":userId})
            return value;
        }else{
            return false;
        }
    }
}

