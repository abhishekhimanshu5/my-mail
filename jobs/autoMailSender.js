import Email from "../src/models/emailModel.js";
const autoMailSender = async (mailData) => {

    const senderIdForOtp = "67699d1910c7f80bdc35af4c";

    try{
        const newMail = await Email.create({
            "senderId" : senderIdForOtp,
            "receiverId" : mailData.receiverId,
            "subject" : mailData.subject,
            "body" : mailData.body,
            "serviceType" : "service",
        });
        return true;
        
    }catch (err){
        //console.log(err);
        return false;
    }

}
export default autoMailSender