import User from "../../src/models/userModel.js";
import jwt from 'jsonwebtoken'


const updateUserProfile = async (req,res) => {

    const userData = req.body;
    const token = req.headers.authorization;
    //console.log(token);

    const decodedPayload = jwt.decode(token);

    try{
        //console.log("inside try");
        const user = await User.findOne({"email":decodedPayload.email});
        //console.log(user);

        if(user){
            //console.log("inside try->if");
            await User.findByIdAndUpdate(user.id,userData,{new: true})
            .then(u => {
                //console.log("after finding user"+u);
                res.send(u);
            })
        }else{
            res.send(`user doesn't exist`);
        }
    }catch (err){
        //console.log("error : "+err);
        res.send(err);
    }

}
export default updateUserProfile;