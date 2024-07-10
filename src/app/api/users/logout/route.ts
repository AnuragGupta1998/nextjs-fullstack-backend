import { connectionDB } from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";


connectionDB();

export async function GET() {
    try {

        const response = NextResponse.json({
            message: "succefully Logout",
            success: true
        })

        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0)

            }
        )
        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}