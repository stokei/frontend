import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/services/send-email";
import {
  AppModel,
  EmailData,
  SubscriptionsCustomers,
  defaultEmails,
  render,
} from "@stokei/transactional";

interface SubscriptionItem {
  productId: string;
  productName: string;
  image?: string;
}
interface BodyData {
  to: EmailData;
  app: AppModel;
  items: SubscriptionItem[];
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    SubscriptionsCustomers.SubscriptionActivatedEmail({
      app: data?.app,
      items: data?.items,
    })
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
