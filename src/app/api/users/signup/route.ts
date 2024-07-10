import {connectionDB} from '@/dbConfig/dbConnection'
import User from "@/models/userModel"
import {NextRequest,NextResponse} from 'next/server'
import { sendEmail } from '@/helpers/mailer'
import bcrypt from "bcryptjs"

connectionDB()  //connecting DB because next js running on edge

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const{username,email,password} = reqBody;

        // console.log("reqBody" + username + email + password); 
    
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await  bcrypt.hash(password,salt);

        // const newUser = new User({
        //     username, 
        //     email,
        //     password:hashPassword
        // });

        // const savedUser = await newUser.save()  //save user into DB
        // console.log("savedUSer " + savedUser)


        const userCreated =await User.create({

            username,
            email,
            password:hashPassword
        })

        
        //send verification email
        // await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        await sendEmail({email,emailType:"VERIFY",userId:userCreated._id})

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            // savedUser
            userCreated
        
        })
        
    } catch (error :any) {
        return NextResponse.json({error:error.messsage},{status:500});     
    }
    
}




