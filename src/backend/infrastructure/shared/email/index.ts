// import nodemailer from 'nodemailer';

// 配置邮件传输器
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: process.env.SMTP_SECURE === 'true',
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// 发送验证邮件
export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: email,
  //   subject: 'Verify your email address',
  //   html: `
  //     <div>
  //       <h1>Welcome to Garment ERP!</h1>
  //       <p>Please click the button below to verify your email address:</p>
  //       <a href="${verificationUrl}" style="
  //         display: inline-block;
  //         padding: 10px 20px;
  //         background-color: #1890ff;
  //         color: white;
  //         text-decoration: none;
  //         border-radius: 4px;
  //       ">
  //         Verify Email
  //       </a>
  //       <p>Or copy and paste this link in your browser:</p>
  //       <p>${verificationUrl}</p>
  //       <p>This link will expire in 24 hours.</p>
  //     </div>
  //   `,
  // });
}

// 发送密码重置邮件
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: email,
  //   subject: 'Reset your password',
  //   html: `
  //     <div>
  //       <h1>Password Reset Request</h1>
  //       <p>Click the button below to reset your password:</p>
  //       <a href="${resetUrl}" style="
  //         display: inline-block;
  //         padding: 10px 20px;
  //         background-color: #1890ff;
  //         color: white;
  //         text-decoration: none;
  //         border-radius: 4px;
  //       ">
  //         Reset Password
  //       </a>
  //       <p>Or copy and paste this link in your browser:</p>
  //       <p>${resetUrl}</p>
  //       <p>This link will expire in 1 hour.</p>
  //       <p>If you didn't request this, please ignore this email.</p>
  //     </div>
  //   `,
  // });
} 