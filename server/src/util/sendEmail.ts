import { Resend } from "resend";

const FROM = process.env.EMAIL_FROM as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

let resend: Resend | undefined;

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return undefined;
  if (!resend) resend = new Resend(apiKey);
  return resend;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${CLIENT_URL}/verify?token=${token}`;
  const client = getResend();

  if (!client) {
    console.log(`[email disabled] verification link for ${email}: ${link}`);
    return;
  }

  await client.emails.send({
    from: FROM,
    to: email,
    subject: "И-мэйлээ баталгаажуулна уу",
    html: `<p>Бүртгэлээ баталгаажуулахын тулд доорх холбоос дээр дарна уу:</p><p><a href="${link}">${link}</a></p><p>Энэ холбоос 24 цагийн дараа хүчингүй болно.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const link = `${CLIENT_URL}/reset-password?token=${token}`;
  const client = getResend();

  if (!client) {
    console.log(`[email disabled] reset link for ${email}: ${link}`);
    return;
  }

  await client.emails.send({
    from: FROM,
    to: email,
    subject: "Нууц үг сэргээх",
    html: `<p>Нууц үгээ сэргээхийн тулд доорх холбоос дээр дарна уу:</p><p><a href="${link}">${link}</a></p><p>Энэ холбоос 1 цагийн дараа хүчингүй болно.</p>`,
  });
};
