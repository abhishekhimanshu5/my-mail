import jwt from 'jsonwebtoken'
import Email from '../../src/models/emailModel.js';

const getSentMail = async (req,res) => {
    const token = req.headers.authorization;

        const decodedPlayload = jwt.decode(token);

        // joining Emails and Users where (senderid in email == _id in user)
        Email.aggregate([
            {
              $addFields: {
                senderId: { $toObjectId: "$senderId" },  // Convert senderId from string to ObjectId
                receiverId: { $toObjectId: "$receiverId" },
              },
            },
            // join information -> email with user
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
            // where user.email = email coming from payload
            {
              $match: { 'senderUser.email': decodedPlayload.email }, // Match by user's email
            },
            // join information -> email with user
            {
                $lookup: {
                    from : 'users',
                    localField : 'receiverId',
                    foreignField : '_id',
                    as : 'receiverUser',
                },
            },
            {
                $unwind: { 
                    path: '$receiverUser',        // Flatten the array if only one element
                    preserveNullAndEmptyArrays: true,  // Optional: Keeps emails even if there's no matching user
                },
            },
            // field that we want to be selected from inner joins
            {
                $project: {
                  _id: 1,                   // Keep Email's _id
                  subject: 1,               // Keep the subject of the email
                  body: 1,                  // Keep the body of the email
                  'senderUser.name': 1,      // Keep the user's name from the inboxMail (user)
                  'senderUser.email': 1,     // Keep the user's email from the inboxMail (user)
                  'receiverUser.name': 1,
                  'receiverUser.email': 1,
                },
            },
          ])
            .then(mails => {
              //console.log('Aggregated Mails:', mails);  // This should now return the correct result
              res.status(200).send(mails);
            })
            .catch(err => console.error('Error:', err));
        
}

export default getSentMail;