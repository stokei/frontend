import { nodemailerApi } from "@/clients/nodemailer";
import { sendgridClient } from "@/clients/sendgrid";
import { IS_PRODUCTION } from "@/environments";
import { EmailData } from "@stokei/transactional";

export interface SendEmailData {
  replyTo?: string;
  from: EmailData;
  to: EmailData;
  subject: string;
  html: string;
}

export const sendEmail = (data: SendEmailData) => {
  if (!IS_PRODUCTION) {
    if (!data?.from || !data?.to) {
      return new Error("Data not found");
    }
    return nodemailerApi.sendMail({
      from:
        typeof data?.from === "string"
          ? data?.from
          : {
              address: data?.from?.email,
              name: data?.from?.name || "",
            },
      to:
        typeof data?.to === "string"
          ? data?.to
          : {
              address: data?.to?.email,
              name: data?.to?.name || "",
            },
      subject: data?.subject,
      html: data?.html,
      replyTo: data?.replyTo,
    });
  }
  return sendgridClient.send(data);
};
