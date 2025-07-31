// utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config

const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
      tls: {
    rejectUnauthorized: false, 
  },
  });
};

const sendVerificationEmail = async (user, token) => {
  const transporter = getTransporter();
  const link = `${process.env.BASE_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; padding: 30px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
        <h2 style="color: #111827;">Hello, ${user.name} 👋</h2>
        <p style="color: #4b5563; font-size: 16px;">
          Thank you for registering with us! Please click the button below to verify your email address and complete your sign-up process.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" target="_blank"
            style="background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
            ✅ Verify Email
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          If the button above doesn't work, you can also copy and paste the following link into your browser:
        </p>
        <p style="color: #1f2937; font-size: 14px; word-break: break-all;">
          <a href="${link}" target="_blank" style="color: #2563eb;">${link}</a>
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #9ca3af; font-size: 12px;">
          This link will expire in 24 hours. If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
