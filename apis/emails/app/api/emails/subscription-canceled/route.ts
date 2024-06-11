import { NextRequest, NextResponse } from "next/server";
import { sendgridClient } from "@/clients/sendgrid";
import {
  render,
  defaultEmails,
  SubscriptionCanceledEmail,
  AppModel,
  EmailData,
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
    SubscriptionCanceledEmail({
      app: data?.app,
      items: data?.items,
    })
  );

  await sendgridClient.send({
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
