# Kenya Snake Guide

A responsive educational gallery built with plain HTML, CSS, and JavaScript. No build tools or paid hosting are required.

## Files
- `index.html` — website structure
- `style.css` — design and mobile layout
- `snakes.js` — snake profile data
- `app.js` — search, filters, image display, and profile dialog

## Important research note
This is a starter project, not an authoritative checklist of Kenyan snakes. Some entries are marked **Needs verification** because taxonomy and Kenyan distribution need checking. Before submitting academic work, verify every entry with reputable references such as the National Museums of Kenya, Kenya Wildlife Service, IUCN Red List, and regional herpetology field guides. Remove any species that you cannot confirm.

## Photographs
The site searches Wikimedia Commons for a likely photograph for each species and displays the file page, credit, and licence in the profile when available. Search results can still be mismatched or unavailable, so inspect every image carefully. If an image is wrong, replace the search query in `snakes.js` or choose a verified direct image URL. Do not assume an image is free to reuse.

## Publish with GitHub Pages
1. Sign in at https://github.com/ and create a **public** repository named `kenya-snakes-guide`.
2. Upload `index.html`, `style.css`, `snakes.js`, `app.js`, and `README.md` into the repository's root (the main file list).
3. Open the repository's **Settings** tab.
4. In the left sidebar, click **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main` and folder `/(root)`, then click **Save**.
7. Wait a few minutes. The Pages page will display your website URL, usually `https://YOUR-USERNAME.github.io/kenya-snakes-guide/`.

## Test before publishing
Open `index.html` in a browser. Search and filters should work without installing anything. An internet connection is required for remote photographs.

## Edit the gallery
Open `snakes.js` to update species data. Keep each `id` unique. Use `status: "venomous"`, `status: "non-venomous"`, or `status: "check"`. Use the last option whenever you have not verified classification, taxonomy, or Kenyan distribution.

This site is educational, not an emergency identification tool. Never approach or handle a snake.
