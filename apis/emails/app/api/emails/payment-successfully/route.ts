import { NextRequest, NextResponse } from "next/server";

import { sendgridClient } from "@/clients/sendgrid";
import {
  render,
  defaultEmails,
  PaymentSuccessfullyEmail,
  AppModel,
  EmailData,
} from "@stokei/transactional";

interface BodyData {
  to: EmailData;
  totalAmount: string;
  subtotalAmount: string;
  app: AppModel;
}

export async function POST(request: NextRequest) {
  const data: BodyData = await request.json();
  if (!data) {
    return NextResponse.error();
  }
  const emailHtml = render(
    PaymentSuccessfullyEmail({
      app: data?.app,
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
    subject: "Pagamento efetuado com sucesso",
    html: emailHtml,
  });

  return NextResponse.json({ ok: true });
}
