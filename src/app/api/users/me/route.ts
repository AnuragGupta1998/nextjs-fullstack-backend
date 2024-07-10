import { connectionDB } from "@/dbConfig/dbConnection";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";



connectionDB()

export async function GET(request:NextRequest){
    try {
    
        const userId = await getDataFromToken(request)

        console.log("userId"+userId)

        const user = await User.findOne({_id:userId}).select("-password");

        console.log("user"+user)

        if(!user){
            return NextResponse.json({
                message:"invalid token"
            })
        }

        return NextResponse.json({
            message:"user Found",
            data:user
        })
        
    } catch (error: any) {
        return NextResponse.json( {error:error.message},{status:400});
        
    }
}