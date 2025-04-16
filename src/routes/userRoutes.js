import express from 'express'
import UserController from '../controllers/userController.js';
import { AuthMiddleWare } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/',AuthMiddleWare, UserController.getAllUser)
userRouter.post('/signin',UserController.signIn)

userRouter.post('/signout',UserController.signOut)
userRouter.post('/register',UserController.register)
userRouter.post('/user/update-profile',UserController.updateUserProfile)
userRouter.post('/update-password',AuthMiddleWare,UserController.generateOtpForPassword)
userRouter.post('/update-password/verify-otp',AuthMiddleWare,UserController.verifyOtpForPassword)
userRouter.get('/getUserDetails',AuthMiddleWare,UserController.getUserDetails)
userRouter.get('/get-all-user',UserController.getAllUsers)




export default userRouter;