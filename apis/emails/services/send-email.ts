import { sendgridClient } from "@/clients/sendgrid";
import { EmailData } from "@stokei/transactional";

export interface SendEmailData {
  replyTo?: string;
  from: EmailData;
  to: EmailData;
  subject: string;
  html: string;
}

export const sendEmail = (data: SendEmailData) => sendgridClient.send(data);
