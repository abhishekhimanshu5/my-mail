import Email from "../../src/models/emailModel.js";
import jwt from 'jsonwebtoken'

const getReceivedMail = async (req,res) => {
    const token = req.headers.authorization;

        const decodedPlayload = jwt.decode(token);

        Email.aggregate([
            {
                $addFields: {
                  senderId: { $toObjectId: "$senderId" },  // Convert senderId from string to ObjectId
                  receiverId: { $toObjectId: "$receiverId" },
                },
            },
            {
                $lookup: {
                  from: 'users',            // Name of the other collection (ensure it's pluralized and lowercase)
                  localField: 'receiverId',    // Field in `Email` that references `User._id`
                  foreignField: '_id',       // Field in `User` that matches `senderId`
                  as: 'receiverUser',           // Output array field for matched user data
                },
            },
            {
                $unwind: { 
                    path: '$receiverUser',        // Flatten the array if only one element
                    preserveNullAndEmptyArrays: true,  // Optional: Keeps emails even if there's no matching user
                },
            },
            {
                $match: { 'receiverUser.email': decodedPlayload.email }, // Match by user's email
            },
            {
                $lookup: {
                  from: 'users',            // Name of the other collection (ensure it's pluralized and lowercase)
                  localField: 'senderId',    // Field in `Email` that references `User._id`
                  foreignField: '_id',       // Field in `User` that matches `senderId`
                  as: 'senderUser',           // Output array field for matched user data
                },
            },
            {
                $unwind: { 
                  path: '$senderUser',        // Flatten the array if only one element
                  preserveNullAndEmptyArrays: true,  // Optional: Keeps emails even if there's no matching user
                },
            },
            {
                $project: {
                  _id: 1,                   // Keep Email's _id
                  subject: 1,               // Keep the subject of the email
                  body: 1,  
                  'receiverUser.name': 1,
                  'receiverUser.email': 1,                // Keep the body of the email
                  'senderUser.name': 1,      // Keep the user's name from the inboxMail (user)
                  'senderUser.email': 1,     // Keep the user's email from the inboxMail (user)
                  
                },
            },

        ]).then(mails => {
            //console.log('Aggregated Mails:', mails);  // This should now return the correct result
            res.status(200).send(mails);
          })
          .catch(err => console.error('Error:', err));
}
export default getReceivedMail;