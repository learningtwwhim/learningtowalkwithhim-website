# learningtowalkwithhim.com

The author website for **Learning to Walk with Him: From Reluctant Missionary to Devoted Disciple, Lessons of Faith, Focus and the Savior's Love** by Ken Smith.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com).

---

## Local development

```bash
npm install        # first time only
npm run dev        # http://localhost:4321
npm run build      # production build to ./dist
npm run preview    # serve the production build locally
```

Node 22.12+ is required.

---

## Add a blog post in 4 steps

1. **Create a new Markdown file** in `src/content/blog/`. Name the file whatever you want the URL slug to be — for example `the-quiet-mile.md` becomes `/blog/the-quiet-mile/`.
2. **Add the frontmatter** at the top of the file. All five fields are required:
   ```md
   ---
   title: "Your post title"
   date: 2026-06-01
   format: story        # one of: story | scripture | question | behind
   excerpt: "One or two sentences shown on the blog index and used as the meta description."
   draft: false         # set to true to keep it unpublished
   ---
   ```
3. **Write the post body** below the frontmatter in Markdown. Headings, lists, links, blockquotes, and images all work as expected. (You can also use `.mdx` if you need components.)
4. **Save the file.** During `npm run dev` it appears immediately. For production, run `npm run build` and deploy the `dist/` folder.

Drafts (`draft: true`) are excluded from the blog index, individual post pages, the RSS feed, and the sitemap.

---

## Update the Amazon link

The "Buy on Amazon" button on `/book` (and any other place that links to the book) reads from a single constant.

Open **`src/consts.js`** and change `AMAZON_URL`:

```js
export const AMAZON_URL = 'https://www.amazon.com/dp/YOUR-ASIN';
```

Save, rebuild, deploy. That one change updates every Amazon link sitewide.

---

## Swap the book cover image

The current homepage and book page show a styled placeholder where the cover will go. To swap in the real cover:

1. **Drop the cover file** into `public/` as `book-cover.jpg` (or `.png`/`.webp`). Recommended size: at least 800×1200 px, 2:3 aspect ratio.
2. **Replace the placeholder block** in two files:
   - `src/pages/index.astro` (hero section)
   - `src/pages/book.astro` (sticky cover column)

   Find the `<div class="aspect-[2/3] ...">` placeholder and replace it with:
   ```astro
   <img
     src="/book-cover.jpg"
     alt="Cover of Learning to Walk with Him by Ken Smith"
     width="800"
     height="1200"
     class="aspect-[2/3] w-full max-w-sm mx-auto rounded-md shadow-2xl"
   />
   ```
3. **Add an Open Graph image** while you're at it: drop a 1200×630 px share image at `public/og-default.png`. `BaseHead.astro` automatically uses it for every page's Open Graph and Twitter card.

That's it.

---

## Project structure

```
src/
  components/        Header, Footer, BaseHead, FormattedDate
  content/blog/      Markdown blog posts (the only place you regularly edit)
  layouts/           BaseLayout, BlogPost
  pages/             Top-level routes (.astro files = pages)
  styles/global.css  Tailwind import + brand tokens (@theme)
  consts.js          Site title, social links, nav, Amazon URL — edit me
  content.config.js  Blog frontmatter schema
public/              Static files served as-is (favicon, og-default.png, book-cover.jpg)
astro.config.mjs     Astro + sitemap + Google Fonts + Tailwind plugin
```

---

## Deployment

Any static host works. Recommended: **Netlify** or **Cloudflare Pages**.

- Build command: `npm run build`
- Output directory: `dist`

Point `learningtowalkwithhim.com` at the host's CDN and you're live.

---

## Wiring up the email form (Kit / ConvertKit)

The hero email form on the homepage posts to a placeholder URL. To wire it up:

1. In Kit, create a form and copy its embed code.
2. In `src/pages/index.astro`, replace the three `REPLACE_ME` values in the `<form>` tag with your form's `action`, `data-sv-form`, and `data-uid`.

## Wiring up the contact form

The contact form posts to Formspree by default. Replace `YOUR_FORM_ID` in `src/pages/contact.astro` with your Formspree form ID — or change the `action` URL to any other form-handling endpoint (Netlify Forms, Basin, etc.).
