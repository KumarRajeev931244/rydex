import { auth } from "@/auth";
import connectDb from "@/lib/db";
import PartnerBank from "@/models/partnerBank.model";
import PartnerDocs from "@/models/partnerDocx.model";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

export async function GET(
    req:NextRequest,
    context:{param:Promise<{id:string}>}
) {
    try {
        const session = await auth()
        if(!session || !session.user?.email || session.user.role !== "admin"){
            return Response.json(
                {message:"unauthorised"},
                {status:400}
            )
        }
        connectDb()
        const partnerId = (await context.param).id
        const partner = await User.findById(partnerId)
        if(!partner || partner.role !=="admin"){
            return Response.json(
                {message:"partner not found"},
                {status:400}
            )
        }
        const vehicle = await Vehicle.findOne({owner:partnerId})
        const documents = await PartnerDocs.findOne({owner:partnerId})
        const bank = await PartnerBank.findOne({owner:partnerId})
        return Response.json(
                {vehicle:vehicle || null,
                    document:documents || null,
                    bank: bank || null
                },
                {status:200}
            )
    } catch (error) {
        return Response.json(
                {message:`partner get error ${error}`},
                {status:500}
            )
        
    }
}