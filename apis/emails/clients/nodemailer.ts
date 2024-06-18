import nodemailer from "nodemailer";

export const nodemailerApi = nodemailer.createTransport({
  host: "localhost",
  port: 4025,
  secure: false,
});
