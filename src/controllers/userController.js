import updateUserProfile from "../../api/user/updateUserProfile.js";
import registerNewUser from "../../api/user/registerNewUser.js";
import signIn from "../../api/user/signin.js";
import signOut from "../../api/user/signout.js";
import {generateOtpForPassword,verifyOtpForPassword} from "../../api/user/updatePassword.js";




export default class UserController {


    // Get all users
    
    static getAllUser = async (req, res) => {
        try {
            const users = await User.find(); // Fetch all users from the database
            // console.log(users);
            res.status(200).json(users); // Send the list of users as a JSON response
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error: error.message }); // Error handling
        }
    }

// for sign-in a user
    static signIn = signIn;
// for sign-out a user
    static signOut = signOut;
// for registering a user
    static register = registerNewUser
// for updatin user profile
    static updateUserProfile = updateUserProfile
// for updating password
    static generateOtpForPassword = generateOtpForPassword
    static verifyOtpForPassword = verifyOtpForPassword
}