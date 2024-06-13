import { sendEmail } from "@/services/send-email";
import {
  AppModel,
  EmailData,
  UpdateOwnPasswordEmail,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

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

  await sendEmail({
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
