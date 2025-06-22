import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
import Nodemailer from "nodemailer";
dotenv.config();

export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN,
  })
);

export const sender = {
  address: "hello@kebinmalla.com.np",
  name: "ThriftIT",
};