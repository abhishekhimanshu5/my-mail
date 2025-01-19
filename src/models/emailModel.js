import mongoose from "mongoose";

const emailSchema = mongoose.Schema(
    {
        senderId : {
            type : String,
            required : [true,"Sender email is required"],
            trim : true,
            lowercase : true,
        },
        receiverId : {
            type : String,
            required : [true,"Receiver email is required"],
            trim : true,
            lowercase : true,
        },
        subject : {
            type : String,
            required : true,
            maxlength : [255,"max 255 character"],
        },
        body : {
            type : String,
            required : true,
        },
        isSent : {
            type : Boolean,
            default : false,
        },
        isRead : {
            type : Boolean,
            default : false,
        },
        sentAt : {
            type : Date,
            default : Date.now
        },
        deletedBySender : {
            type : Boolean,
            default : false,
        },
        deletedByReceiver : {
            type : Boolean,
            default : false,
        },
        deletedForAll : {
            type : Boolean,
            default : false,
        },
        serviceType : {
            type : String,
            default : "message"
        }
    },
    {
        timestamps : true,
    }
);

const Email = mongoose.model('Email',emailSchema,'emails')

export default Email;