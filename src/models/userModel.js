import mongoose,{mongo, Schema} from "mongoose";
import { type } from "os";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: [true,"please enter your username"],
            unique: true
        },
        email:{
            type: String,
            required: [true,"please enter your email"],
            unique: true
        },
        password:{
            type: String,
            required: [true,"please enter your password"]
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        verifyToken: String,

        verifyTokenExpiry: Date,

        forgotPassword: String,

        forgotPasswordExpiry: Date,
    }
)

const User =mongoose.models.users || mongoose.model("users", userSchema)

export default User;