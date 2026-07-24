# Trioak Furniture Co. website

A responsive, editorial furniture website for Trioak Furniture Co. in Indore.

This repository is maintained as a local project. The working copy in this
folder is the source of truth; no Sites deployment is required.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` when integrations are needed.
3. Run `npm run dev`.
4. Validate with `npm run lint` and `npm run build`.

## Replacing placeholder content

- Logo: add approved files under `public/brand/` and update `components/site-shell.tsx`.
- Photography: replace the labeled editorial placeholder under `public/media/` with authorized Trioak media.
- Instagram and YouTube: add verified account configuration through `.env.local`.
- Google Map: the contact page uses the verified address query; add coordinates only after confirmation.
- Testimonials and projects: add only verified content to typed files under `data/`.
- Catalogue: place the approved PDF under `public/documents/` and link it from the catalogue page.
- Email delivery: configure `FORM_DELIVERY_WEBHOOK` and a secure server route before enabling direct submissions.

The current enquiry form validates input and continues through the official Trioak WhatsApp number.
