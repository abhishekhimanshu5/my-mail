import Email from "../../src/models/emailModel.js";
import User from "../../src/models/userModel.js";

const getAllUser = async(req,res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const skip = (page - 1)*limit;

    try {
        const total = await Email.countDocuments();
        const users = await Email.find()
                            .skip(skip)
                            .limit(limit);
        
        if(!users){
            res.status(400).json({
                message : 'Failed',
            })
        }else{
            res.status(200).json(
                {
                    message : "Ok",
                    Page : page,
                    Limit : limit,
                    Total : total,
                    users
                }
            )
        }
        
    } catch (error) {
        res.status(400).json({
            message : 'Failed',
            Error : error
        })
    }
       
}
export default getAllUser;