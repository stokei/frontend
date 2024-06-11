import { NextRequest, NextResponse } from "next/server";

import { sendgridClient } from "@/clients/sendgrid";
import {
  render,
  defaultEmails,
  OrderCreatedEmail,
  AppModel,
  EmailData,
} from "@stokei/transactional";

interface OrderItem {
  productId: string;
  productName: string;
  price: string;
  image?: string;
  fromPrice?: string;
}
interface BodyData {
  to: EmailData;
  totalAmount: string;
  subtotalAmount: string;
  app: AppModel;
  items: OrderItem[];
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    OrderCreatedEmail({
      app: data?.app,
      items: data?.items,
      totalAmount: data?.totalAmount,
      subtotalAmount: data?.subtotalAmount,
    })
  );

  await sendgridClient.send({
    replyTo: data?.app?.email,
    from: {
      name: data?.app?.name,
      email: defaultEmails.contact,
    },
    to: data.to,
    subject: "Pedido criado",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
