import User from '../../src/models/userModel.js';
import bcrypt from 'bcrypt'

const registerNewUser = async(req,res) => {

    const {name,email,password,role} = req.headers;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password,salt);

    try{
        const newUser = await User.create({
            "name" : name,
            "email" : email,
            "password" : hashedPassword,
            "role" : role

        });

        //console.log(newUser);
        res.status(200).send(newUser);

        
    }
    catch(err){
        //console.log(err._message);
        res.status(400).send("failed creating user :"+err);
    }

}
export default registerNewUser;