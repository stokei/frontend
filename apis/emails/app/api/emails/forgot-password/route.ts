import { NextRequest, NextResponse } from "next/server";
import { sendgridClient } from "@/clients/sendgrid";
import {
  render,
  defaultEmails,
  ForgotPasswordEmail,
  AppModel,
  EmailData,
} from "@stokei/transactional";

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
    ForgotPasswordEmail({
      app: data?.app,
      buttonForgotPasswordLink: data?.buttonForgotPasswordLink,
    })
  );

  await sendgridClient.send({
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
