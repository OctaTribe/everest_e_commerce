export interface FonepayQRData {
  merchantId: string;
  merchantName: string;
  amountNpr: number;
  remarks: string;
  qrString: string;
}

/**
 * Helper generating Nepal Fonepay / connectIPS Inter-Bank QR stub
 */
export function generateFonepayQR(orderId: string, amountNpr: number): FonepayQRData {
  return {
    merchantId: "EVEREST_STEEL_BIRGUNJ_9821",
    merchantName: "Everest Steel Furniture Udyog",
    amountNpr,
    remarks: `Order ${orderId}`,
    qrString: `fonepay://pay?merchant_id=EVEREST_STEEL_BIRGUNJ&amt=${amountNpr}&remarks=${encodeURIComponent(orderId)}&type=dynamic`,
  };
}
