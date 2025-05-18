import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
import { ValidationError } from "../errorHandler";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  service: process.env.MAIL_SERVICE,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Email template
const renderEmailTemplate = async (
  templateName: string,
  templateData: Record<string, any>
): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "utils",
    "Mailer",
    `${templateName}.ejs`
  );
  return ejs.renderFile(templatePath, templateData);
};

// Send email
export const sendMail = async (
  to: string,
  subject: string,
  templateName: string,
  templateData: Record<string, any>
) => {
  if (!to || !subject || !templateName) {
    throw new ValidationError(
      "Missing required parameters: to, subject, templateName"
    );
  }
  try {
    const html = await renderEmailTemplate(templateName, templateData);
    await transporter.sendMail({
      from: `<${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.log("Sending Email Error:", error);
    return false;
  }
};