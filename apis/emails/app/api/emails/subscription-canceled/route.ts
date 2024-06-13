import { sendEmail } from "@/services/send-email";
import {
  AppModel,
  EmailData,
  SubscriptionCanceledEmail,
  defaultEmails,
  render,
} from "@stokei/transactional";
import { NextRequest, NextResponse } from "next/server";

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
    SubscriptionCanceledEmail({
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
    subject: "Assinatura cancelada",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
