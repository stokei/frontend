import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/services/send-email";
import {
  EmailData,
  SubscriptionsCustomers,
  defaultEmails,
  render,
} from "@stokei/transactional";

interface BodyData
  extends SubscriptionsCustomers.SubscriptionActivatedEmailProps {
  to: EmailData;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    SubscriptionsCustomers.SubscriptionActivatedEmail(data)
  );

  await sendEmail({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Assinatura ativada",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
