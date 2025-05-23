"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("../errorHandler");
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
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
const renderEmailTemplate = (templateName, templateData) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = path_1.default.join(process.cwd(), "src", "utils", "Mailer", `${templateName}.ejs`);
    return ejs_1.default.renderFile(templatePath, templateData);
});
// Send email
const sendMail = (to, subject, templateName, templateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!to || !subject || !templateName) {
        throw new errorHandler_1.ValidationError("Missing required parameters: to, subject, templateName");
    }
    try {
        const html = yield renderEmailTemplate(templateName, templateData);
        yield transporter.sendMail({
            from: `<${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        });
        return true;
    }
    catch (error) {
        console.log("Sending Email Error:", error);
        return false;
    }
});
exports.sendMail = sendMail;
