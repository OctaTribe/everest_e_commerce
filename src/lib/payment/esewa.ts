import crypto from "crypto";

export interface EsewaPaymentPayload {
  amount: number;
  taxAmount?: number;
  productServiceCharge?: number;
  productDeliveryCharge?: number;
  totalAmount: number;
  transactionUuid: string;
  productCode: string;
  successUrl: string;
  failureUrl: string;
}

export interface EsewaInitiatedForm {
  actionUrl: string;
  fields: Record<string, string>;
}

const ESEWA_TEST_SECRET = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
const ESEWA_PRODUCT_CODE = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
const ESEWA_ACTION_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

/**
 * Generates an HMAC-SHA256 signature for eSewa ePay v2
 */
export function generateEsewaSignature(
  totalAmount: number,
  transactionUuid: string,
  productCode: string = ESEWA_PRODUCT_CODE,
  secretKey: string = ESEWA_TEST_SECRET
): string {
  // Format mandated by eSewa v2: total_amount=100,transaction_uuid=11-201-13,product_code=EPAYTEST
  const signatureString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(signatureString);
  return hmac.digest("base64");
}

/**
 * Creates the complete form payload ready for direct form submission or client redirect
 */
export function buildEsewaForm(
  amount: number,
  transactionUuid: string,
  successUrl: string,
  failureUrl: string,
  productCode: string = ESEWA_PRODUCT_CODE
): EsewaInitiatedForm {
  const signature = generateEsewaSignature(amount, transactionUuid, productCode);

  return {
    actionUrl: ESEWA_ACTION_URL,
    fields: {
      amount: amount.toString(),
      tax_amount: "0",
      total_amount: amount.toString(),
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
    },
  };
}

/**
 * Verifies eSewa v2 callback response (Base64 encoded JSON)
 */
export function verifyEsewaCallback(encodedData: string, secretKey: string = ESEWA_TEST_SECRET) {
  try {
    const decodedString = Buffer.from(encodedData, "base64").toString("utf-8");
    const json = JSON.parse(decodedString);

    // Verify signature
    const checkSignature = generateEsewaSignature(
      Number(json.total_amount),
      json.transaction_uuid,
      json.product_code,
      secretKey
    );

    const isAuthentic = checkSignature === json.signature;
    return {
      isValid: isAuthentic,
      status: json.status,
      transactionUuid: json.transaction_uuid,
      totalAmount: Number(json.total_amount),
      transactionCode: json.transaction_code,
    };
  } catch (err) {
    return {
      isValid: false,
      status: "ERROR",
      error: String(err),
    };
  }
}
