import { connectionDB } from "@/dbConfig/dbConnection";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connectionDB();
console.log("db connected verifyemail")

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json()

        console.log("verifyemail route");

        const {token} = reqBody;
        console.log("token"+ token); 

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json( {error:"Invalid Token OR user already verified"},{status:400});
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({
            message:"email verified successfully",
            success:true
        })    
    } catch (error:any) {
        return NextResponse.json( {error:error.message},{status:500});
     
    }
}