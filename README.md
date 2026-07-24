<div align="center">

# Trioak Furniture Co.

Premium custom furniture and interior solutions for residential, commercial, office and modular spaces in Indore.

[![Open Live Website](https://img.shields.io/badge/OPEN_LIVE_WEBSITE-1B1B19?style=for-the-badge&logo=github&logoColor=white)](https://satitech-official.github.io/trioak-furniture-website/)

<a href="https://satitech-official.github.io/trioak-furniture-website/">
  <img src="https://raw.githubusercontent.com/satitech-official/trioak-furniture-website/main/public/images/real/living-room.jpg" alt="Trioak Furniture Website Preview" width="100%" />
</a>

**Click the preview image or button to open the live website.**

</div>

## Live website

https://satitech-official.github.io/trioak-furniture-website/

## Website highlights

- Premium editorial furniture design
- Responsive multi-page experience
- Residential, commercial, office, modular and custom furniture collections
- Project, services, gallery, contact, quote, comparison and search experiences
- Direct WhatsApp enquiry flow
- Local, repository-controlled furniture imagery
- GitHub Pages compatible static deployment

## Image reliability

The website uses local images stored under `public/images/` and `public/media/`. The deployment workflow preserves the existing visual design while applying the GitHub Pages repository path to images, background images, icons and downloadable assets.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` when integrations are needed.
3. Run `npm run dev`.
4. Validate with `npm run lint` and `npm run build`.

## Content notes

- Replace photographs only with approved Trioak media while keeping the current file paths or updating their references carefully.
- Instagram, WhatsApp and business details are configured in `data/brand.ts`.
- The enquiry form validates user input and continues through the official Trioak WhatsApp number.
- GitHub Pages deployment runs automatically from `.github/workflows/deploy-pages.yml`.
