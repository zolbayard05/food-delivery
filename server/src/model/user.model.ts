import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    phoneNumber: String,
    address: String,
    isVerified: Boolean,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true },
);

export const UserModel = model("user", UserSchema);
