/**
 * =============================================================================
 * GSA FLEET SALE — QUARTERLY UPDATE
 * =============================================================================
 *
 * This one file controls the /gsa page AND the "GSA Fleet Sales" navbar link.
 * Nothing else needs to be touched.
 *
 * Full instructions, including troubleshooting: see GSA-PAGE.md in the project
 * root. The short version is below.
 *
 * TO PUT A NEW SALE UP:
 *   1. Drop the new PDFs into `public/uploads/gsa/`, keeping these exact names
 *      (just overwrite the old ones):
 *        - block-sheet.pdf
 *        - sale-packet.pdf
 *        - terms-and-conditions.pdf
 *        - remarketing-brochure.pdf
 *   2. Update `sale` below: number, dates, times, inspection, saleDetailsUrl.
 *   3. Set `takeDownAfter` to the last day the page should be visible.
 *   4. Make sure `enabled` is `true`. Commit and push.
 *
 * TO TAKE IT DOWN:
 *   Either set `enabled: false`, or just let `takeDownAfter` pass — after that
 *   date the next build drops the page (it 404s) and removes the navbar link.
 *
 * NOTE: this is a static site, so the auto-take-down happens on the next BUILD,
 * not at the moment the date passes. The scheduled GitHub Actions build handles
 * that on its own.
 * =============================================================================
 */

export const gsaSale = {
  /** Master switch. `false` hides the page and the navbar link immediately. */
  enabled: true,

  /**
   * Last day the page stays up (YYYY-MM-DD). After the end of this day, the
   * page and navbar link disappear on the next build even if `enabled` is true.
   * Usually the same as `sale.closesDate`, or a few days later if you want to
   * leave results up for a bit.
   */
  takeDownAfter: "2026-10-01",

  sale: {
    /** GSA sale number, e.g. "6FDDCI26708". */
    number: "6FDDCI26708",

    /** Bidding opens (YYYY-MM-DD) and the time shown next to it. */
    opensDate: "2026-09-24",
    opensTime: "11:00 AM",

    /** Bidding closes (YYYY-MM-DD) and the time shown next to it. */
    closesDate: "2026-10-01",
    closesTime: "11:00 AM",

    /** On-site inspection day and hours. Set `inspectionDate: ""` to hide. */
    inspectionDate: "2026-09-29",
    inspectionHours: "9:00 AM - 4:00 PM",

    /** Link to this specific sale on the GSA marketplace. */
    saleDetailsUrl:
      "https://marketplace.gsafleet.gov/sales/sale-details/6FDDCI26693",
  },

  /**
   * The PDF buttons. Filenames are fixed — you overwrite the files in
   * `public/uploads/gsa/` each quarter rather than editing this list.
   * If you don't get one of these for a given sale, comment out its line.
   */
  documents: [
    { label: "View Block Sheet", href: "/uploads/gsa/block-sheet.pdf" },
    { label: "Download Sale Packet", href: "/uploads/gsa/sale-packet.pdf" },
    {
      label: "Internet Sale Terms and Conditions",
      href: "/uploads/gsa/terms-and-conditions.pdf",
    },
    {
      label: "GSA Remarketing Brochure",
      href: "/uploads/gsa/remarketing-brochure.pdf",
    },
  ],
} as const;

/** Where the "GSA Fleet Sales" link points, and what it's called in the nav. */
export const GSA_NAV_LINK = {
  name: "GSA Fleet Sales",
  href: "/gsa",
} as const;

/** GSA's public bidding portal — used in the instructions copy. */
export const GSA_MARKETPLACE_URL = "https://marketplace.gsafleet.gov/sales/landing";

/**
 * True when the GSA page should exist and the navbar link should show.
 * Used by both `src/pages/gsa/[...page].astro` and `src/layouts/Base.astro`,
 * so the page and the link can never disagree.
 */
export function isGsaSaleLive(now: Date = new Date()): boolean {
  if (!gsaSale.enabled) return false;
  if (!gsaSale.takeDownAfter) return true;

  // End of `takeDownAfter` in Central time. -06:00 (CST) is used year-round so
  // the page is never pulled an hour EARLY during daylight saving.
  const deadline = new Date(`${gsaSale.takeDownAfter}T23:59:59-06:00`);
  if (Number.isNaN(deadline.getTime())) return true;

  return now <= deadline;
}

/** "2026-09-24" -> "9/24/2026" */
export function formatSaleDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${Number(month)}/${Number(day)}/${year}`;
}

/** "2026-09-24" -> "09/24/2026" */
export function formatSaleDatePadded(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${month}/${day}/${year}`;
}
