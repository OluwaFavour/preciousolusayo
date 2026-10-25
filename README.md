# Precious Olusayo — iPhone portfolio

A responsive, static portfolio that opens at a locked iOS-style interface on every visit, with standard coloured app icons and a Liquid Glass navigation layer. The interface fills the browser edge to edge, following the full-viewport approach of the supplied frvky.online reference. There is no physical phone frame, hardware cutout, surrounding editorial page, or desktop device mockup. Built in strict TypeScript with no client framework or runtime dependencies.

## Run locally

This ZIP includes the complete editable TypeScript source and a ready-to-serve static website. It does not require API keys, a backend or a JavaScript framework at runtime.

Extract the ZIP, open a terminal in `precious-olusayo-portfolio/`, then run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8000/ in your browser. Python is used only as a convenient local file server; any static web server can serve the `dist/` directory.

## Edit and build

Install Node.js with npm, then run:

```sh
npm ci
npm run build
```

TypeScript 7.0.2 is pinned in the lockfile. `npm run check` performs a strict type check without writing output. After editing TypeScript, rebuild to update `dist/js/`. HTML, CSS and bundled assets are served directly from `dist/`.

## Deploy

The GitHub repository is `OluwaFavour/preciousolusayo`. Vercel project `preciousolusayo` in `oluwafavours-projects` deploys the `main` branch to production, with automatic deployments through the GitHub integration.

`vercel.json` configures framework **Other**, install command `npm ci`, build command `npm run build`, and output directory `dist`. No environment variables are required. Keep `dist/` in Git: it contains the editable HTML, CSS, and bundled assets as well as compiled JavaScript. Local Vercel project metadata in `.vercel/` is ignored.

To deploy manually from a linked checkout, run `vercel --prod`. Run `npm run check` and `npm run build` before publishing changes.

Upload the contents of `dist/` to your static web host and serve that directory as the site root. Asset URLs are root-relative; opening `index.html` directly with `file://`, or hosting this export under an unchanged URL subdirectory, is not supported. The sign-in gate on the ChatGPT-hosted Site is a hosting access setting and is not part of this static export.

## Bundle contents

- `src/`: editable TypeScript source.
- `dist/`: ready-to-serve HTML, CSS, compiled JavaScript and all portfolio assets.
- `dist/assets/trimly-documents/`: the original shared PDF, Word and Excel files, nine document page previews, and the eleven-sheet workbook preview.
- `package.json`, `package-lock.json`, `tsconfig.json`: development configuration.
- `README.md`: run, build, content and verification notes.

## Experience

- Drag or swipe upward to unlock. The unlock prompt is also a keyboard-accessible button; the up arrow unlocks from the lock screen.
- Open app icons, close them with the Home indicator, or press Escape to return.
- Search the portfolio from the Search control, `/`, or Command/Ctrl+K.
- Swipe down from the status indicators, or tap them, to open Control Centre.
- Control Centre uses a compact four-column glass grid with working brightness, appearance, reduced motion, welcome-notification visibility, Files and Photos shortcuts, and portfolio locking. Full screen appears only where the browser supports it. Inert hardware, media, volume and rotation controls have been removed.
- The lock control inside Control Centre returns to the lock screen. The status bar uses filled iOS 27-style cellular, Wi-Fi and battery silhouettes; these visual indicators are not hardware controls.
- Desktop and mobile both use the entire viewport. Desktop content has readable columns and a compact Control Centre anchored to the upper right; shorter viewports use compact layouts.
- Appearance and reduced motion are stored locally. The unlock state is deliberately not persisted.
- Unlocking focuses the Home Screen region rather than a card. Swiping or scrolling upward does not preselect the profile widget; pressing Tab still moves to a visibly focused control.

## Applications

| App | Content |
| --- | --- |
| Contacts | Biography, career history, contact information |
| Files | Trimly, Valto, Faceless Freedom; case-study PDFs and complete Trimly PDF, DOCX and XLSX delivery documents with previews |
| Results | Reported project outcomes, with context |
| Notes | Five process notes grounded in documented project decisions |
| Calendar | Future date/time proposals in WAT, opened as email requests |
| Photos | 14 actual case-study slides in separate Trimly and Faceless Freedom collections |
| Reminders | Explicitly labelled example launch-readiness checklist |
| Settings | Tools, skills, education, appearance, reduced motion, asset credit |
| Safari | Resume preview/download, professional links, reading list |
| Phone | Telephone and other contact options |
| Messages | Conversation starters that populate an email draft |
| Mail | Email composition that continues in the visitor's email application |

Calendar does not assert availability or confirm meetings. Mail and Messages do not send anything automatically or transmit drafts to a server. There are no fabricated testimonials, certificates or project screenshots. No Camera application is included; the lock-screen shortcuts open Mail and Files.

## Updating content

- `src/main.ts`: application registry, home-screen navigation, state and gestures.
- `src/control-center.ts` and `dist/control-center.css`: Control Centre layout, display controls and shortcuts.
- `src/apps.ts`: career information, contact details, email, calendar, settings, professional links.
- `src/projects.ts`: case studies, metrics, delivery notes, slide gallery, example checklist.
- `src/case-study-media.ts`: typed presentation metadata, slide captions, document paths and download names.
- `src/trimly-documents.ts` and `dist/trimly-documents.css`: Trimly's file folder, nine-page document viewer and eleven-sheet workbook preview.
- `src/icons.ts`: native-style vector application icons and interface glyphs.
- `dist/index.html` and `dist/style.css`: Home Screen, Lock Screen and base interface.
- `dist/fullscreen.css` and `dist/fullscreen-apps.css`: frameless viewport shell and responsive desktop application layouts.
- `dist/apps.css` and `dist/project-apps.css`: application interfaces and floating glass navigation.
- `dist/liquid-glass.css`: shared refractive materials, transparent widgets, dock and reflective clock.
- `dist/portrait.css`: a consistent head-and-shoulders framing of the supplied original photograph across the profile widget and app avatars.
- `dist/assets/`: downloadable documents, wallpaper and presentation thumbnails.

Rebuild after modifying TypeScript. CSS and HTML are served directly.

## Content provenance

Professional content was checked against Precious's Master Resume & Career Profile and a clean existing recruiter-facing resume from the Technical Project Management Job Search folder. Internal strategy documents and private source links are not shipped in the website.

The supplied Trimly presentation informed the case study. Its XWorld-specific final slide was excluded from the seven-slide public PDF, and PDF metadata was sanitized. Trimly's original launch target was 5 May 2026; actual public launch was 26 May, within the approved budget. The portfolio distinguishes Precious's delivery coordination from engineering implementation and team/product outcomes.

The supplied Trimly Drive folder's three original shared files are bundled unchanged in `dist/assets/trimly-documents/`: Project Delivery Record PDF, Project Delivery Record DOCX, and Delivery Workbook XLSX. Files → Trimly presents them alongside the interactive case study. The record has a nine-page image preview with page selection and zoom; the Word download shares the matching PDF preview. The workbook preview includes all eleven worksheets, 629 populated cells, 142 formula cells and 75 merged ranges, with saved values, dates, percentages, source colors and complete notes. Its original Excel download retains formulas, filters and validation. Browser column widths approximate Excel character widths; row heights can expand to fit text.

These documents are an October 2026 retrospective compilation supplied by Precious, not original Jira exports or signed approvals. The site preserves that provenance and keeps readiness sign-off on 25 May separate from checklist closure on 26 May. The Decisions section traces TRIM-19 payment integration, TRIM-71 soft-launch error-message feedback and TRIM-79 checklist ownership. All three bundled downloads match the supplied originals byte for byte; no Google Drive authentication is needed to access them from the static website.

The profile portrait uses the supplied original JPEG unchanged, framed through a 704×704 crop window at source coordinates (341,437). The original is 1365×2048. CSS applies the same framing to the Home widget, Contacts, Phone, Messages, Settings and small profile buttons; no generated face replacement is used.

Valto remains explicitly in development. The supplied eight-slide Faceless Freedom presentation is included unchanged as `faceless-freedom-case-study.pdf`, with all eight pages rendered as 1600×900 WebP slides. Its project section covers Overview, Workflow, Decisions and Outcomes. The five-stage Asana production workflow, prepared-video contingency, contributor coordination and transition into ongoing operations come from that presentation.

The Faceless Freedom 395K figure concerns one turnaround video compared with a previous approximate 40K average. The further 107K video is reported at approximately five times its own typical performance; its benchmark is separate. The site preserves the distinction between Precious's strategy/delivery coordination and team/project outcomes. Production capacity is reported as up to seven deliverables per week, per channel, without extrapolating a sustained portfolio total.

The iOS 27 wallpaper is the original extracted Celosia asset, retrieved from [iClarified](https://www.iclarified.com/101089/download-the-official-ios-27-wallpaper-for-iphone). Source credit appears in Settings. Apple's current iOS page and [Control Centre user guide](https://support.apple.com/guide/iphone/use-and-customize-control-center-iph59095ec58/ios) were checked as visual references. Icon illustrations are original layered SVG artwork using the standard coloured appearance. Opaque reading surfaces are preserved in apps; translucent glass is concentrated on the shell, navigation and controls. An SVG backdrop displacement filter adds subtle refraction where supported, with a standard blur fallback. Reduced-motion and reduced-transparency preferences are supported.

## Verification

Strict TypeScript compilation passed. Browser review covered desktop and iframe viewports of 390×844 and 375×667; actual pointer dragging unlocked the device. All twelve apps opened, and the project tabs, search-to-project route, Home navigation, dark appearance, reduced-motion setting and example checklist were checked. App content fit the 390-pixel viewport without horizontal overflow.

The final native-layout pass was visually reviewed in Contacts, Files, Notes, Calendar, Results, Mail, Messages, Photos and Safari. Photos Library/Collections, the slide filmstrip, Safari's compact action menu and resume preview, and the Reminders remaining count were exercised. Control Centre's swipe-down access, appearance switch, keyboard-adjustable brightness and power-to-lock transition were verified. The 375×667 layout preserves access to the app content and compact controls. The frameless desktop shell was checked at 1363×936: the screen exactly fills the viewport, no device elements remain, and pointer-drag unlocking works.

WAT midnight/year-boundary calculations and email encoding were checked. All referenced static assets exist, the resume is a valid two-page PDF, and the public case study is a valid seven-page PDF without XWorld text. The resume loaded in the in-app PDF preview. Download links point directly to the bundled documents.

Temporary mobile QA HTML is excluded from this export.

The Faceless Freedom update passed strict TypeScript compilation and a source review against all eight supplied PDF pages. Browser checks covered its four case-study tabs, both document links, the 14-slide Library, both Collections, first/last navigation boundaries and each collection's correct PDF. All eight Faceless images loaded at 1600×900. The case study fit 375px and 320px widths without horizontal page overflow; the filmstrip scrolls within its own container and keeps the selected final slide visible at 320px. The original PDF and bundled copy have identical SHA-256 hashes.

The unlock-focus regression was reproduced with a scroll gesture after keyboard focus: the profile button acquired a blue outline. After the fix, unlock focuses the Home Screen region with no focused card; pressing Tab then gives the profile button its normal visible focus indicator. Pointer-drag unlocking was also checked. The portrait loads from the byte-identical supplied JPEG, and its framing was reviewed in Contacts. The Home widget's photo and caption fit at 375px and 320px; Contacts and the expanded Trimly Decisions section have no horizontal overflow at those widths.

The document update passed strict TypeScript compilation and a read-only source review. Browser checks covered folder navigation, all eleven worksheet choices, Timeline/Jira Register/Board rendering, PDF first/last page controls, original Word download targeting, page zoom, and layouts at 320px and 375px. Wide worksheets and zoomed pages scroll within their own panes without widening the mobile viewport. Control Centre's appearance, reduced motion, brightness, welcome-notification visibility, Files/Photos shortcuts, full-screen entry/exit and portfolio lock were exercised. Direct browser download-event capture was unavailable in the preview environment; the download anchors and all three exact local file payloads were verified.

## Export version

Exported 25 October 2026 from source commit `56f934e450fe88eaa1a3fc805361a780a30e6b94`.
