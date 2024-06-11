import sendgrid from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "@/environments";

sendgrid.setApiKey(SENDGRID_API_KEY);

export const sendgridClient = sendgrid;
