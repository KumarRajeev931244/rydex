import mongoose from "mongoose";

interface IPartnerDocs{
    owner:mongoose.Types.ObjectId
    aadharUrl:string,
    rcUrl:string,
    licenceUrl:string,
    status:"approved" | "pending" | "rejected",
    rejectionReason?:string,
    createdAt:Date,
    updatedAt:Date
    
}
const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    aadharUrl:String,
    rcUrl:String,
    licenceUrl:String,
    status:{
        type:String,
        enum:["approved" , "pending" , "rejected"],
        default:"pending"
    },
    rejectionReason:String,
},{timestamps:true})

const  partnerDocs = mongoose.models.partnerDocs || mongoose.model("partnerDocs", partnerDocsSchema)
export default partnerDocs