import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true },
);

export const UserModel = model("user", UserSchema);
