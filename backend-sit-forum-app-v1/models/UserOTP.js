import { Schema, model } from 'mongoose';

const UserOTPSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
}, {timestamps: true});

const UserOTP = model("UserOTP", UserOTPSchema);
export default UserOTP;