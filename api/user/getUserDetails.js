import jwt from 'jsonwebtoken'
import User from '../../src/models/userModel.js';

const getUserDetails = async(req,res) => {
    const decodedPayload = jwt.decode(req.headers.authorization);

    try{
        const curUser = await User.findOne({"email" : decodedPayload.email});

        if(curUser){
            res.status(200).send(curUser);
        }
        else{
            res.status(400).send("No user found");
        }
    }
    catch(err){
        res.status(400).send("error occured");
    }

}

export default getUserDetails;