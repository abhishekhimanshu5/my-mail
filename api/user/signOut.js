import Token from "../../src/models/tokenModel.js";

const signOut = async(req,res) => {
    const token =  req.headers.authorization;
    
    try{
        // creating a new document in blacklisttoken collection
        await Token.create({
            "token" : token,
        }).then(token => {
            //console.log(token);
            //res.send("signout...")
            if(req.passwordUpdate && req.passwordUpdate==true){
                res.send("Password updated.....Signed Out for security reasons......");
            }else{
                res.send("Signed Out Successfully");
            }
        })
    }
    catch(err){
        res.status(400).send("failed to logout "+err)
    }
}
export default signOut;