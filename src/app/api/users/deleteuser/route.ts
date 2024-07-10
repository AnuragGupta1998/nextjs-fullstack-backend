import { connectionDB } from "@/dbConfig/dbConnection";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectionDB();

export async function POST(request:NextRequest){

   try {
     const reqBody = await request.json();
 
     const {email} = reqBody;
 
    const user = await User.findOneAndDelete({email})

    return NextResponse.json({message:"user deleted",data:user})

   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:400})
   }

}
