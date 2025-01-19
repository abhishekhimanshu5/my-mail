import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

export const AuthMiddleWare = async(req,res,next) => {

    const key = process.env.SECRET_KEY;

    const token =  req.headers['authorization'];

    const blacklistedToken = await Token.findOne({"token":token})
    
    if(!blacklistedToken && token){
        jwt.verify(token,key, (err,loaded) => {
            if(err){
                res.status(400).send(err.message);
            }else{
                req.middlewareData = {
                    "userName" : loaded.email
                }
                next();
            }
        })
    }else{
        res.status(400).send("you are signed out");
    }


}