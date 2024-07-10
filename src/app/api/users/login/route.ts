import { connectionDB } from "@/dbConfig/dbConnection";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


connectionDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exists please signup" }, { status: 400 })
        }

        console.log(user)

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "User password did not match please check your password" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data:user
        })

        response.cookies.set("token", token,
            {
                httpOnly: true,
            }
        )

        return response;

        // return NextResponse.json({message:"Login successfully", success:true}).cookies.set("token",token,{httpOnly:true})


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });


    }
}