import Email from "../../src/models/emailModel.js";
import User from "../../src/models/userModel.js";
import jwt from 'jsonwebtoken'

const deleteMail = async (req,res) => {
    const {value} = req.params;

      const allowedValue = ['sent','inbox','bin'];

      if(allowedValue.includes(value)){

        const {id} = req.params;
        const {isDeletedForAll} = req.params
        
        try{
          const mailToBeDeleted = await Email.findById(id);
          const token = req.headers.authorization;
          const decodedPlayload = jwt.decode(token);



          if(mailToBeDeleted){

            const mailOwnerId = mailToBeDeleted.senderId;
            const mailReceiverId = mailToBeDeleted.receiverId

            const ownerUser = await User.findById(mailOwnerId);
            const receiverUser = await User.findById(mailReceiverId);

            // setting updated fields to the mail as per the url type
            const updatedValueForSender = {
              "deletedBySender" : true,
            }

            const updatedValueForReceiver = {
              "deletedByReceiver" : true,
            }

            const updatedValueForSenderAndForAll = {
              "deletedBySender" : true,
              "deletedForAll" : true,
            }
            let updatedValue = null;

            switch(value) {
              
              // for sent mail :-----------------------------------
              case 'sent' : {
                
                if(isDeletedForAll == "true" && decodedPlayload.email == ownerUser.email){
                  updatedValue = updatedValueForSenderAndForAll;
                }else if(isDeletedForAll == null && decodedPlayload.email == ownerUser.email){
                  updatedValue = updatedValueForSender;
                }
                else if(decodedPlayload.email != ownerUser.email){
                  res.end("Not authorized as you are not the sender of this mail");
                  return;
                }
                else{
                  res.end("wrong parameter");
                  return
                }
                break;
              }
              //---------------------------------------------------------------------------------
              // for inbox mail :

              case 'inbox' : {
                if(isDeletedForAll == null && decodedPlayload.email == receiverUser.email){
                  updatedValue = updatedValueForReceiver
                }else if(decodedPlayload.email != receiverUser.email){
                  res.end("Not authorized as you are not the receiver of this mail");
                  return;
                }
                break;
              }
              //--------------------------------------------------------------------------------------

              case 'bin' : {
                break;
              }
            }

            await Email.findByIdAndUpdate(id,updatedValue,{new:true})
            .then( val => {
              if(val){
                res.send(val);
              }else{
                res.send(`something went wrong ${val}`);
              }
            })
          }
          else{
            res.send("mail not found");
          }

        }catch(err){
          res.send(err);
        }
        
          

        
      }else{
        res.send(`this ${value} parameter is invalid`);
      }
    }

    export default deleteMail;
