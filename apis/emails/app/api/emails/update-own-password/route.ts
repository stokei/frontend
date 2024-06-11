import { NextRequest, NextResponse } from "next/server";
import { sendgridClient } from "@/clients/sendgrid";
import {
  render,
  defaultEmails,
  UpdateOwnPasswordEmail,
  AppModel,
  EmailData,
} from "@stokei/transactional";

interface BodyData {
  to: EmailData;
  buttonUpdateOwnPasswordLink: string;
  app: AppModel;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    UpdateOwnPasswordEmail({
      app: data?.app,
      buttonUpdateOwnPasswordLink: data?.buttonUpdateOwnPasswordLink,
    })
  );

  await sendgridClient.send({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Alteração de senha",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
