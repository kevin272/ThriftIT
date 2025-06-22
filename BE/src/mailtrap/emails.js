import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail =  async (email,verificationToken) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode",verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully",response);
        
    } catch (error) {
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email,name) => {
    const recipient = [email];
    try {
        const res= mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            templateUuid: "68c2a0e1-0bc3-47fa-9d8e-bad14961eae1",
            template_variables: {
                company_info_name: "ThriftIT",
                name: name
            }
        })
        console.log("Welcome email sent successfullt",res)
        
    } catch (error) {
        console.error("Error sending welcome email",error);
        throw new Error(`Error sending welcome email: ${error}`);
        
        
    }
}

export const sendPasswordResetEmail = async (email,resetURL) =>{
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        
    } catch (error) {
        console.error("Error sending password reset email", error);

        throw new Error(`Error sending password reset email: ${error}`);
        
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipient = [email];

    try {
        const response = await mailtrapClient.sendMail({
            from: sender,
            to: recipient,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        
        console.log("Password reset email sent successfully");
        
    } catch (error) {
        console.error("Error sending password reset succes email", error);

        throw new Error(`Error sending password reset success email: ${error}`);
        
    }

}