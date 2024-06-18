import sendgrid from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "@/environments";

if (SENDGRID_API_KEY) {
  sendgrid.setApiKey(SENDGRID_API_KEY);
}
export const sendgridClient = sendgrid;
