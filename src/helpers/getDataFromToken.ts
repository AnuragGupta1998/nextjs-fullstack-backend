
import jwt from "jsonwebtoken";
import { NextRequest,NextResponse } from "next/server";


export const getDataFromToken = async (request:NextRequest)=>{
    try {
        // console.log("getFromToken method")
        const token = request.cookies.get("token")?.value || "" ;

        const decodedToken :any = jwt.verify(token, process.env.TOKEN_SECRET!)
        // console.log("decodedId"+decodedToken.id)

        return decodedToken.id;
        
    } catch (error: any) {
        return NextResponse.json( {error:"error in getFromToken"},{status:500});
    }

}