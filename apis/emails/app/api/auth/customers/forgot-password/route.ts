import { NextRequest, NextResponse } from "next/server";
import {
  render,
  defaultEmails,
  AuthCustomers,
  AppModel,
  EmailData,
} from "@stokei/transactional";
import { sendEmail } from "@/services/send-email";

interface BodyData {
  to: EmailData;
  buttonForgotPasswordLink: string;
  app: AppModel;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    AuthCustomers.ForgotPasswordEmail({
      app: data?.app,
      buttonForgotPasswordLink: data?.buttonForgotPasswordLink,
    })
  );

  await sendEmail({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Esqueceu sua senha?",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
