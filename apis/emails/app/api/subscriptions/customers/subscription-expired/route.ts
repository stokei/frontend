import { sendEmail } from "@/services/send-email";
import {
  EmailData,
  SubscriptionsCustomers,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

interface BodyData
  extends SubscriptionsCustomers.SubscriptionExpiredEmailProps {
  to: EmailData;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    SubscriptionsCustomers.SubscriptionExpiredEmail(data)
  );

  await sendEmail({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Sua assinatura expirou",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
