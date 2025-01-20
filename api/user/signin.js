import User from "../../src/models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const signIn = async(req,res) => {
    const key = process.env.SECRET_KEY;

    try{

        const {email,password} = req.body;
        const user = await User.findOne({"email" : email});

        if(user){

            if(user.status == 'active'){
                const isCorrectPassword = await bcrypt.compare(password,user.password);
                if(isCorrectPassword){

                    const token = jwt.sign({"email":user.email},key);
                    await User.findOneAndUpdate({"email" : user.email}, {"lastLogin" : Date.now()}, {new:true})
                    .then(u => {
                        res.status(200).json({'token':token, 'user':u});
                    });
                    

                }else{
                    res.send("wrong password");
                }
            }else{
                res.status(400).send(`user is ${user.status}. Can't signin`);
            }
            
            
        }else{
            res.status(400).send("invalid user")
        }

    } 
    catch(err){
        res.status(400).send("error fetching data"+err);
    }
}
export default signIn;