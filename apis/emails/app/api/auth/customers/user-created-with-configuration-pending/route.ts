import { sendEmail } from "@/services/send-email";
import {
  AuthCustomers,
  EmailData,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

interface BodyData
  extends AuthCustomers.UserCreatedWithConfigurationPendingEmailProps {
  to: EmailData;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    AuthCustomers.UserCreatedWithConfigurationPendingEmail(data)
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
