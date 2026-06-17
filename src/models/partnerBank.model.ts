import mongoose from "mongoose";

interface IPartnerBank{
    owner:mongoose.Types.ObjectId
    accountHolder:string,
    accountNumber:string,
    ifsc:string,
    upi?:string
    status:"added" | "not_added" | "verified",
    createdAt:Date,
    updatedAt:Date
    
}
const partnerBankSchema = new mongoose.Schema<IPartnerBank>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    
    accountHolder:{
        type:String,
        required:true
    },
    accountNumber:{
        type:String,
        required:true,
        unique:true
    },
    ifsc:{
        type:String,
        required:true,
        uppercase:true
    },
    upi:String,
   
    status:{
        type:String,
        enum:["added", "not_added" , "verified"],
        default:"not_added"
    },
   
},{timestamps:true})

const  partnerBank = mongoose.models.partnerBank || mongoose.model("partnerBank",partnerBankSchema)
export default partnerBank