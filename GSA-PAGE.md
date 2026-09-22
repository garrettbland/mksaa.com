# GSA Fleet Sales page — how to update it

Everything about the `/gsa` page lives in **one config file**:

```
src/data/gsa-sale.ts
```

Open that file, change the values, commit, push. That's the whole job. You
should never need to touch the page markup, the navbar, or the sitemap.

---

## Quick reference

| I want to... | Do this |
| :--- | :--- |
| Put a new sale up | Steps 1–4 [below](#putting-a-new-sale-up) |
| Take the page down now | Set `enabled: false`, commit, push |
| Have it come down on its own | Set `takeDownAfter` to the last day it should show |
| Swap a PDF | Overwrite the file in `public/uploads/gsa/`, keep the same filename |
| Change the sale number or dates | Edit the `sale` block in the config |
| Hide one document button | Comment out its line in the `documents` array |

---

## Putting a new sale up

### 1. Drop in the PDFs

Put the new documents in `public/uploads/gsa/`, **keeping these exact
filenames** (just overwrite the old ones):

```
public/uploads/gsa/block-sheet.pdf
public/uploads/gsa/sale-packet.pdf
public/uploads/gsa/terms-and-conditions.pdf
public/uploads/gsa/remarketing-brochure.pdf
```

The filenames are fixed on purpose — as long as you keep them, the buttons on
the page keep working and you don't have to edit any code for the documents.

If you didn't get one of these for a given sale, comment out its line in the
`documents` array in the config so the page doesn't show a dead button.

### 2. Update the sale details

In `src/data/gsa-sale.ts`, edit the `sale` block:

```ts
sale: {
  number: "6FDDCI26693",        // GSA sale number
  opensDate: "2026-07-16",      // bidding opens — always YYYY-MM-DD
  opensTime: "11:00 AM",
  closesDate: "2026-07-23",     // bidding closes
  closesTime: "11:00 AM",
  inspectionDate: "2026-07-21", // set to "" to hide the inspection line
  inspectionHours: "9:00 AM - 4:00 PM",
  saleDetailsUrl: "https://marketplace.gsafleet.gov/sales/sale-details/6FDDCI26693",
},
```

**Dates must be `YYYY-MM-DD`.** You only enter each date once — the page
formats it for every spot it appears (the `7/16/2026 to 7/23/2026` line under
the title, and the `07/16/2026 11:00 AM through...` line in the notice).

Double-check `saleDetailsUrl` actually points at *this* sale. The old Wix page
had a stale link pointing at a previous sale number, which is exactly the kind
of thing nobody notices.

### 3. Set the take-down date

```ts
takeDownAfter: "2026-07-23",
```

This is the **last day the page stays visible**. Usually the same as
`closesDate`, or a few days later if you want to leave it up after the sale.

### 4. Make sure it's switched on

```ts
enabled: true,
```

Then commit and push. Done.

---

## Taking the page down

Two ways, and either one is enough:

- **Now:** set `enabled: false`, commit, push.
- **On a schedule:** let `takeDownAfter` pass.

When the page is off:

- `/gsa` returns a **404** — the page isn't generated at all
- the **GSA Fleet Sales** navbar link disappears from every page
- the page drops out of `sitemap-0.xml`

Nothing stale is left reachable, which is why it 404s rather than sitting there
with last quarter's info on it.

### ⚠️ The one gotcha

This is a **static site**, so the page is built once and served as files. The
`takeDownAfter` date is checked **at build time, not in the visitor's browser.**

That means: **the page does not disappear by itself unless something rebuilds
the site after that date.** If there's no scheduled/automatic build running,
the page will keep showing until the next time someone pushes a change.

If you want it gone on a specific day and aren't sure a build will happen, just
push a commit that day (flipping `enabled` to `false` is the obvious one).

---

## What goes where on the page

| Config value | Where it shows up |
| :--- | :--- |
| `sale.opensDate` / `closesDate` | `Internet Sale Only \| 7/16/2026 to 7/23/2026` under the title |
| `sale.number` | `Sale #6FDDCI26693` in the Auction Notice block |
| `sale.opensDate` + `opensTime` + `closesDate` + `closesTime` | the `07/16/2026 11:00 AM through 07/23/2026 11:00 AM` line |
| `sale.inspectionDate` + `inspectionHours` | the "Inspection Date for the Sale" line |
| `sale.saleDetailsUrl` | the "View Sale Details Online" button |
| `documents[]` | the four PDF buttons under "Sale Documents" |

The address, phone number and the "How to Bid" copy are static text in
`src/pages/gsa/[...page].astro` — edit there in the unlikely event they change.

---

## Testing before you push

```sh
npm run dev     # then open http://localhost:4321/gsa
```

Or do a full build and check what came out:

```sh
npm run build
ls dist/gsa          # should exist when the sale is live, be missing when it's off
```

Sanity check the on/off switch by temporarily setting `takeDownAfter` to a past
date and rebuilding — the page count should drop by one and `dist/gsa` should
not exist. Set it back afterward.

---

## Troubleshooting

**The navbar link shows but the page 404s (or vice versa)**
Shouldn't be possible — both read the same `isGsaSaleLive()` function. If you
see it, you're looking at a stale build; rebuild and redeploy.

**A PDF button 404s**
The file isn't in `public/uploads/gsa/`, or the filename doesn't match the one
in the `documents` array. Filenames are case-sensitive on the server even
though they aren't on your Mac.

**The dates on the page look wrong or show as `2026-07-16`**
A date isn't in `YYYY-MM-DD` form. The formatter passes anything it can't parse
straight through, so a malformed date shows up raw on the page.

**I turned it off but it's still up**
See the gotcha above — something has to rebuild the site. Push a commit.

---

## Files involved

| File | What it does |
| :--- | :--- |
| `src/data/gsa-sale.ts` | **The only file you normally edit.** Config + the on/off logic. |
| `src/pages/gsa/[...page].astro` | The page itself. The odd filename is deliberate — it's how Astro is told to skip building the page entirely when the sale is off. |
| `src/layouts/Base.astro` | Adds the GSA link to the navbar when the sale is live. |
| `src/components/Navbar.tsx` | Renders whatever links it's handed. |
| `public/uploads/gsa/*.pdf` | The four sale documents. |
