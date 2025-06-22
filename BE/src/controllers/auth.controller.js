import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie, generateVerificationCode } from "../utils/helper.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import crypto from "crypto";

export const signup = async (req,res) => {
    const{email,password,name} = req.body;
    try {
        if(!email||!password||!name){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists){return res.status(400).json({success:false, message: "User Already Exists"})};
        
    } catch (error) {
        return res.status(400).json({success:false, message: error.message});
        
    }
    const hashedPassword = await bcryptjs.hash(password,10);
    const verificationToken  = generateVerificationCode();
    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 *1000 //24hrs
    })

    await user.save();

    generateTokenAndSetCookie(res,user._id);
    
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    })
}
export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){return res.status(400).json({success:false, message: "Invalid credentials"})
        };
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid){return res.status(400).json({success:false, message: "Invalid credentials"})}
    generateTokenAndSetCookie(res,user._id);
    user.lastLogin= new Date();
    await user.save();
    
    res.status(200).json({
        success:true,
        message:"Loggedin Successfully",
        user: {
            ...user._doc,
            password: undefined
        }
    })
    } 
    catch (error) {
        console.log("Error in Login",error);
        res.status(400).json({success:false, message: error.message});
        
    } 
}
export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message: "Logged Out successfully"
    });
}

export const verifyEmail = async(req,res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false , message:"Invalid or expired verification code"})
        }
        user.isVerified= true;
        user.verificationToken= undefined;
        user.verificationTokenExpiresAt= undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({success:true, 
            message:"Email verified successfully",
            user:{
        ...user._doc,
        password: undefined,
    }})
        
    } catch (error) {
        console.error("Error during email verification:", error);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred during email verification. Please try again later."
        })
    }
}

export const forgotPassword = async(req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                success:false,
                message:"Account not found"
            });}

            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiresAt = Date.now() + 1*60*60*1000; //1hr

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpiresAt = resetTokenExpiresAt;

            await user.save();

		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
            res.status(200).json({success:true, 
            message:"Reset Password Email sent successfully",
            });

        
        
    } catch (error) {
        console.log("Error in Forgot Password",error);
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

export const resetPassword = async(req,res) => {

    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });
         if (!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired reset token"
            });};

        console.log("Current password hash (before update):", user.password);
        
        const hashedPassword = await bcryptjs.hash(password,10);
        console.log("New password (hashed):", hashedPassword);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt= undefined;
        await user.save();


        await sendResetSuccessEmail(user.email);
        res.status(200).json({
                success:true,
                message:"Password reset successfully"
        })
    } catch (error) {
        console.log("Error in ResetPassword", error);
        res.status(400).json({
                success:false,
                message:error.message,
        });
    }

}

export const checkAuth = async(req,res) => {
    try{
    const user =await User.findById(req.userId).select("-password");
    if (!user){
        return res.status(400).json({success:false, message: "User not found"});
    }
    res.status(200).json({
        success: true,
        user
    })}
    catch(error){
        console.log("Error in checkAuth", error);
        res.status(400).json({
        success: false,
        message: error.message
    })
    }
}