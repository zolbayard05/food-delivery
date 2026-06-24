import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";

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

  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
  });

  return c.json({
    message: "amjilttai burtgelee",
    user: newUser,
  });
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

  return c.json({
    message: "amjilttai nevterlee",
    user,
  });
};
