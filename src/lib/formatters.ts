// Everest Steel Furniture Udyog - Utility Formatters for Currency & Manufacturing Specifications

/**
 * Formats a numeric price into Nepalese Rupee standard format (e.g. NPR 38,500)
 */
export function formatNPR(amount: number, showSymbol = true): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

  return showSymbol ? `NPR ${formatted}` : formatted;
}

/**
 * Formats NPR into Devanagari script (e.g. रू ३८,५००)
 */
export function formatNPRNepali(amount: number): string {
  const formatted = new Intl.NumberFormat("ne-NP", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `रू ${formatted}`;
}

/**
 * Formats product dimensions into standard architectural format
 */
export function formatDimensions(h: number, w: number, d: number): string {
  return `${h}"H × ${w}"W × ${d}"D`;
}

/**
 * Converts inches to feet and inches (e.g. 78" -> 6' 6")
 */
export function inchesToFeet(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return remainingInches > 0 ? `${feet}' ${remainingInches}"` : `${feet}'`;
}
