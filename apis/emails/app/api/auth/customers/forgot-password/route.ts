import { sendEmail } from "@/services/send-email";
import {
  AuthCustomers,
  EmailData,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

interface BodyData extends AuthCustomers.ForgotPasswordEmailProps {
  to: EmailData;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(AuthCustomers.ForgotPasswordEmail(data));

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
