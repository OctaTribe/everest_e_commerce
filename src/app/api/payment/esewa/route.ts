import { NextRequest, NextResponse } from "next/server";
import { verifyEsewaCallback, buildEsewaForm } from "@/lib/payment/esewa";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedData = searchParams.get("data");

  if (!encodedData) {
    return NextResponse.redirect(new URL("/checkout?payment=failed&reason=missing_data", request.url));
  }

  const result = verifyEsewaCallback(encodedData);

  if (result.isValid && result.status === "COMPLETE") {
    return NextResponse.redirect(
      new URL(
        `/checkout?payment=success&gateway=esewa&txn=${result.transactionCode || result.transactionUuid}&amount=${result.totalAmount}`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(`/checkout?payment=failed&reason=${result.status || "invalid_signature"}`, request.url)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, transactionUuid, successUrl, failureUrl } = body;

    const reqOrigin = request.nextUrl.origin;
    const finalSuccessUrl = successUrl || `${reqOrigin}/api/payment/esewa`;
    const finalFailureUrl = failureUrl || `${reqOrigin}/checkout?payment=failed`;

    const form = buildEsewaForm(amount, transactionUuid, finalSuccessUrl, finalFailureUrl);
    return NextResponse.json({ success: true, form });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 400 });
  }
}
