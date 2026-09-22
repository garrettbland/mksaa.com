# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## GSA Fleet Sales page (quarterly)

The `/gsa` page and its navbar link are controlled entirely by
**`src/data/gsa-sale.ts`** — that file has the full checklist at the top.

Short version, each quarter:

1. Overwrite the PDFs in `public/uploads/gsa/` (keep the same filenames):
   `block-sheet.pdf`, `sale-packet.pdf`, `terms-and-conditions.pdf`,
   `remarketing-brochure.pdf`
2. Update the sale number, dates, inspection info and `saleDetailsUrl`
3. Set `takeDownAfter` to the last day the page should be visible
4. Make sure `enabled: true`, then commit and push

When `enabled` is `false` **or** `takeDownAfter` has passed, the next build
skips the page entirely: `/gsa` 404s, the navbar link disappears, and it drops
out of the sitemap. No other files need editing.
