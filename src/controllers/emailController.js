import createNewMail from "../../api/email/createNewMail.js";
import getSentMail from "../../api/email/getSentMail.js";
import getReceivedMail from "../../api/email/getReceivedMail.js";
import deleteMail from "../../api/email/deleteMail.js";


export default class EmailController{

    // api for creating new email
    static createNewMail = createNewMail;
    // api for getting all sent mail
    static getSentMail = getSentMail;
    // api for getting received mail
    static getReceivedMail = getReceivedMail
    // for deleting mail
    static deleteMail = deleteMail;
    // for searching mail
    //static searchMail = searchMail;
}

