import express from 'express'
import EmailController from '../controllers/emailController.js';
import { AuthMiddleWare } from '../middleware/authMiddleware.js';

const emailRouter = express.Router();

emailRouter.post('/create-mail',AuthMiddleWare,EmailController.createNewMail)
emailRouter.get('/sent',AuthMiddleWare,EmailController.getSentMail)
emailRouter.get('/inbox',AuthMiddleWare,EmailController.getReceivedMail)
emailRouter.delete('/:value/delete/:id/:isDeletedForAll?',AuthMiddleWare,EmailController.deleteMail)
emailRouter.post('/search/')

export default emailRouter;