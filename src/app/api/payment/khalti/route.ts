import { NextRequest, NextResponse } from "next/server";
import { verifyKhaltiPayment, initiateKhaltiPayment } from "@/lib/payment/khalti";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pidx = searchParams.get("pidx");
  const purchaseOrderId = searchParams.get("purchase_order_id");

  if (!pidx) {
    return NextResponse.redirect(new URL("/checkout?payment=failed&reason=missing_pidx", request.url));
  }

  const result = await verifyKhaltiPayment(pidx);

  if (result.success || searchParams.get("status") === "Completed") {
    return NextResponse.redirect(
      new URL(
        `/checkout?payment=success&gateway=khalti&txn=${pidx}&order=${purchaseOrderId || ""}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(`/checkout?payment=failed&reason=${result.status || "unverified"}`, request.url)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const reqOrigin = request.nextUrl.origin;
    
    const payload = {
      ...body,
      returnUrl: body.returnUrl || `${reqOrigin}/api/payment/khalti`,
      websiteUrl: body.websiteUrl || reqOrigin,
    };

    const result = await initiateKhaltiPayment(payload);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 400 });
  }
}
