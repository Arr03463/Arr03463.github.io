# Aaron Jones Engineering Portfolio

A dependency-free static portfolio deployed with GitHub Pages. The site uses semantic HTML, one stylesheet, one JavaScript file, and structured project data—there is no compile or package-install step.

## Local preview

Run a static server from the repository root (opening `index.html` directly will prevent the browser from fetching `projects.json`):

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Content map

- `index.html` — page sections, experience, process, skills, About, resumes, contact, SEO, and accessibility landmarks.
- `style.css` — design tokens, layout, components, dialog, responsive navigation, mobile layouts, focus states, and reduced motion.
- `script.js` — project loading, filters, project cards, case-study dialog, mobile navigation, and current year.
- `projects.json` — the single source of truth for project and case-study content.
- `assets/placeholders/` — honest technical placeholders; replace these with approved optimized media.
- `assets/resumes/` — centralized resume downloads.

## Add or update a project

1. Copy an existing object in `projects.json` and give it a unique lowercase `slug`.
2. Set `projectType` to `professional`, `personal`, or `academic`.
3. Add filterable category slugs such as `hardware`, `manufacturing`, `test-validation`, `embedded-systems`, `automation`, `systems`, or `documentation`.
4. Set `featured` to `true` to include it in the default view.
5. Write a factual `summary`, `role`, and `status`. Use `Planned`, `Prototype`, or `Active Development` for unfinished work.
6. Add only populated arrays. The case study conditionally hides empty fields.
7. Set `confidential` to `true` for generalized professional work.
8. Put an optimized `.webp`, `.avif`, `.jpg`, `.png`, or `.svg` in `assets/projects/<slug>/`, then update `thumbnail` and `imageAlt`.
9. Add `githubUrl`, `liveUrl`, or `documentationUrl` only when a public URL is available. GitHub links render conditionally.
10. Validate JSON after editing: `python -m json.tool projects.json`.

Suggested image dimensions are 1440×810 or another 16:9 crop, under roughly 250 KB where practical. Never present stock or generated photographs as authentic project evidence. Sanitized diagrams and clearly labeled placeholders are appropriate.

## Update other content

- **Skills:** edit the discipline cards in the `#skills` section of `index.html`.
- **Experience:** edit or duplicate the `.experience-card` structure. Do not publish internal specifications, customer information, proprietary photographs, or company documents.
- **Resume:** replace PDFs inside `assets/resumes/` while retaining the current names, or update the three centralized links in the `#resume` section and the hero download button.
- **Social/contact:** update the GitHub, LinkedIn, YouTube, TikTok, and email links in `index.html`. Also update the JSON-LD `sameAs` values.
- **Social preview:** replace `assets/og-preview.svg` with an approved 1200×630 raster preview and update the `og:image` URL if its filename changes.

## Deploy through GitHub Pages

This user-site repository requires no build. In the repository’s GitHub **Settings → Pages**, choose **Deploy from a branch**, select the publishing branch and `/(root)`, then save. Push the four site files, `README.md`, and `assets/` to that branch. GitHub serves `index.html` at `https://arr03463.github.io/`.

Direct refreshes work because the portfolio is a single static document using anchor navigation and a native dialog rather than client-side routes. Test the published URL after every content update.

## Release checklist

- Run a local static server and confirm that project cards load.
- Test every filter and open/close case studies with keyboard and pointer.
- Check navigation at 375 px, 768 px, and desktop widths.
- Verify every local link and public external link.
- Confirm all authentic media has useful alt text and no confidential details.
- Confirm professional work precedes personal projects and unsupported metrics are absent.
- Check the browser console and the deployed GitHub Pages URL.

## Assets still needed

Approved project/workbench photographs, sanitized PCB and equipment images, oscilloscope and VNA screenshots, inductor photos, AutoBOM UI/architecture images, public repository URLs, accurate dates/statuses, approved quantitative outcomes, optional headshot, preferred contact/social updates, and a final raster social-preview image.
