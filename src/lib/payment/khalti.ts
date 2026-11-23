export interface KhaltiInitiatePayload {
  returnUrl: string;
  websiteUrl: string;
  amountNpr: number;
  purchaseOrderId: string;
  purchaseOrderName: string;
  customerInfo?: {
    name: string;
    email?: string;
    phone: string;
  };
}

const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY || "Key test_secret_key_8804c62241684c9bb9d6825c04b89a81";
const KHALTI_INITIATE_URL = "https://a.khalti.com/api/v2/epayment/initiate/";
const KHALTI_LOOKUP_URL = "https://a.khalti.com/api/v2/epayment/lookup/";

/**
 * Initiates Khalti ePayment v2
 */
export async function initiateKhaltiPayment(payload: KhaltiInitiatePayload) {
  // Amount in paisa (1 NPR = 100 Paisa)
  const amountInPaisa = Math.round(payload.amountNpr * 100);

  const requestBody = {
    return_url: payload.returnUrl,
    website_url: payload.websiteUrl,
    amount: amountInPaisa,
    purchase_order_id: payload.purchaseOrderId,
    purchase_order_name: payload.purchaseOrderName,
    customer_info: payload.customerInfo,
  };

  try {
    const response = await fetch(KHALTI_INITIATE_URL, {
      method: "POST",
      headers: {
        Authorization: KHALTI_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return {
      success: response.ok,
      pidx: data.pidx,
      paymentUrl: data.payment_url,
      expiresAt: data.expires_at,
      raw: data,
    };
  } catch (err) {
    return {
      success: false,
      error: String(err),
      // Mock fallback URL for instant sandbox test
      mockPaymentUrl: `${payload.returnUrl}?pidx=mock_pidx_${Date.now()}&status=Completed&purchase_order_id=${payload.purchaseOrderId}`,
    };
  }
}

/**
 * Verifies Khalti payment status using lookup API
 */
export async function verifyKhaltiPayment(pidx: string) {
  try {
    const response = await fetch(KHALTI_LOOKUP_URL, {
      method: "POST",
      headers: {
        Authorization: KHALTI_SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();
    return {
      success: response.ok && data.status === "Completed",
      status: data.status,
      transactionId: data.transaction_id,
      amountPaisa: data.total_amount,
      raw: data,
    };
  } catch (err) {
    return {
      success: false,
      status: "FAILED",
      error: String(err),
    };
  }
}
