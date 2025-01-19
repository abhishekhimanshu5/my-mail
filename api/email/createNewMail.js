import User from "../../src/models/userModel.js";
import Email from "../../src/models/emailModel.js";

const createNewMail = async (req,res) => {

    const {senderid,receivermailid,subject,body} =  req.body;

        try{

            if(!senderid || !receivermailid || !subject || !body){

                res.send("invalid data format");

            }else{
                const check = await User.findOne({"email" : receivermailid});

                //console.log(check);

                if(check){
                    const newMail = await Email.create({
                        "senderId" : senderid,
                        "receiverId" : check._id,
                        "subject" : subject,
                        "body" : body,
                    });
        
                    res.send(newMail);
                }else{
                    res.send("receiver doesn't exist");
                }
            }
            

        }catch(err){
            res.send("failed to send mail : "+err);
        }

}

export default createNewMail;