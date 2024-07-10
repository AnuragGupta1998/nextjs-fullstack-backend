import nodemailer from 'nodemailer'
import User from '@/models/userModel';
import bcrypt from 'bcryptjs'



export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {

        const hashToken = await bcrypt.hash(userId.toString(), 10)


        //checking wether it is VERIFY OR RESET.............
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        verifyToken: hashToken,
                        verifyTokenExpiry: Date.now() + 3600000   //expire in 1 hour from now
                    }
                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        forgotPassword: hashToken,
                        forgotPasswordExpiry: Date.now() + 3600000     ///expire in 1 hour from now
                    }
                }
            )

        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ba2f8653624ab4",
                pass: "42165f8b3303c8"
            }
        });


        const verifyHTML = `<p>Click <a href="${process.env.DOMAIN!}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
          or copy and paste the link below in your browser. <br> ${process.env.DOMAIN!}/verifyemail?token=${hashToken}
         </p>`

        const forgotHTML = `<p>Click <a href="${process.env.DOMAIN}/forgotPassword?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
          or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/forgotPassword?token=${hashToken}
          </p>`

        const mailOption = {
            from: 'anurag@gmail.com',                                                      // sender address
            to: email,                                                                     // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === "VERIFY" ? `${verifyHTML}` : `${forgotHTML}`

            // html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            // or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            // </p>` ,// html body
        }

        const mailResponse = await transport.sendMail(mailOption)

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }

}