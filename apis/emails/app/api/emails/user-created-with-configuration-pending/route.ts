import { sendEmail } from "@/services/send-email";
import {
  AppModel,
  EmailData,
  UserCreatedWithConfigurationPendingEmail,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

interface User {
  email: string;
  password: string;
}
interface BodyData {
  to: EmailData;
  user: User;
  app: AppModel;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    UserCreatedWithConfigurationPendingEmail({
      app: data?.app,
      user: data?.user,
    })
  );

  await sendEmail({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Conta criada",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
