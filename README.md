# Solar Plant Site (React + Tailwind)

A small React + Tailwind website to showcase up to 5 solar plants and a contact form compatible with Netlify Forms.

## Quick start

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify, create a new site from Git and connect your GitHub repo.
3. Build command: `npm run build`, Publish directory: `build`
4. (Important) Netlify needs a parseable HTML form at build time to detect forms. This project includes a hidden static form in `public/index.html` with `name="contact"`. The React ContactForm also uses `name="contact"` so submissions will be captured.

## Editing content

- Replace images in `public/images/plant1.svg` ... `plant5.svg` with your images (keep same filenames or update `src/data/plants.js`).
- Update plant details in `src/data/plants.js`.
- Update your contact email in `src/components/ContactForm.jsx` and `src/components/Footer.jsx`.