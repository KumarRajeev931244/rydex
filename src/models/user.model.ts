import mongoose from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    password?:string;
    role:"user" | "partner" | "admin";
    isEmailVerified?:Boolean;
    otp?:string;
    otpExpiresAt?:Date;
    patnerOnBoardingStep:number;
    partnerStatus: "pending" | "approved" | "rejected"
    mobileNumber?:string;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"user",
        enum:["user","partner","admin"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    },
    partnerStatus:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    patnerOnBoardingStep:{
        type:Number,
        min:0,
        max:8,
        default:0
    },
    otpExpiresAt:{
        type:Date
    },
    mobileNumber:{
        type:String
    }

},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User