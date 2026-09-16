import { Context } from "hono";
import crypto from "crypto";
import { connectDb } from "../util/connectDb.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../util/jwt.js";
import { sendVerificationEmail, sendResetPasswordEmail } from "../util/sendEmail.js";

const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

export const signUp = async (c: Context) => {
  await connectDb();

  const { email, password } = await c.req.json();

  if (!email) {
    return c.json(
      {
        message: "email ee oruul",
      },
      400,
    );
  }

  if (!password) {
    return c.json(
      {
        message: "password aa oruul",
      },
      400,
    );
  }

  const signedUp = await UserModel.find({ email });

  if (signedUp.length > 0) {
    return c.json(
      {
        message: "burtgeltei email baina",
      },
      400,
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
    verificationTokenExpiry: new Date(Date.now() + VERIFY_TOKEN_TTL_MS),
  });

  await sendVerificationEmail(email, verificationToken);

  return c.json({
    message: "amjilttai burtgelee, imeilee shalgaad batalgaajuulna uu",
    user: { _id: newUser._id, email: newUser.email },
  });
};

export const verifyEmail = async (c: Context) => {
  await connectDb();

  const token = c.req.query("token");

  if (!token) {
    return c.json({ message: "token oldsongui" }, 400);
  }

  const user = await UserModel.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return c.json(
      { message: "holboos hugatsaa duussan esvel buruu baina" },
      400,
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  return c.json({ message: "imeil amjilttai batalgaajlaa" });
};

export const signIn = async (c: Context) => {
  await connectDb();

  const { email, password } = await c.req.json();

  if (!email) {
    return c.json(
      {
        message: "email ee oruul",
      },
      400,
    );
  }

  if (!password) {
    return c.json(
      {
        message: "password aa oruul",
      },
      400,
    );
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return c.json({
      message: "ehleed burtguul",
    });
  }

  const isCorrect = bcrypt.compareSync(password, user.password!);

  if (!isCorrect) {
    return c.json(
      {
        message: "password buruu baina",
      },
      400,
    );
  }

  if (!user.isVerified) {
    return c.json(
      {
        message: "imeilee shalgaad batalgaajuulna uu",
      },
      403,
    );
  }

  const token = signToken({ id: String(user._id), role: user.role as "ADMIN" | "USER" });

  return c.json({
    message: "amjilttai nevterlee",
    token,
    user: {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
    },
  });
};

export const forgotPassword = async (c: Context) => {
  await connectDb();

  const { email } = await c.req.json();

  if (!email) {
    return c.json({ message: "email ee oruul" }, 400);
  }

  const user = await UserModel.findOne({ email });

  if (user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    await sendResetPasswordEmail(email, resetToken);
  }

  return c.json({
    message: "hereglegch baigaa bol nuuts ug sergeeh holboos ilgeegdlee",
  });
};

export const resetPassword = async (c: Context) => {
  await connectDb();

  const { token, password } = await c.req.json();

  if (!token || !password) {
    return c.json({ message: "token ba shine password shaardlagatai" }, 400);
  }

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: new Date() },
  });

  if (!user) {
    return c.json(
      { message: "holboos hugatsaa duussan esvel buruu baina" },
      400,
    );
  }

  user.password = bcrypt.hashSync(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  return c.json({ message: "nuuts ug amjilttai sergeelee" });
};
