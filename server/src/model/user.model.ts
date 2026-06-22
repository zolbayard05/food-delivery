import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: UserRoleEnum,
});
