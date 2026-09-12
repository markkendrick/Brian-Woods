# Land Development Specialists redesign

Built in this Next.js project as a visual redesign of https://www.landdevspec.net. Production DNS has not been changed.

## Live-site audit (12 September 2026)

Crawl method: HTTPS fetch of the live WordPress/IONOS site. Search Console traffic data was not available in this workspace.

### Hostname and redirects

| Request | Result |
| --- | --- |
| `https://www.landdevspec.net/` | 200, canonical `https://www.landdevspec.net/` |
| `https://landdevspec.net/` | 200 after redirect to `https://www.landdevspec.net/` |
| `http://www.landdevspec.net/` | 200 after redirect to `https://www.landdevspec.net/` |
| `/labout-us/` | 404 (not a current URL; left as 404) |

Preferred hostname: `https://www.landdevspec.net` with trailing slashes.

### Public pages (sitemap)

`https://www.landdevspec.net/wp-sitemap.xml` lists only these indexable pages:

| URL | Title | H1 | Indexable |
| --- | --- | --- | --- |
| `/` | Land Development Consultant Huntington Beach \| Services Los Angeles \| Land Development Specialists | Transforming Land Into Thriving Communities | yes |
| `/about-us/` | About Our Land Development Company \| Land Development Specialists | Who We Are | yes |
| `/contact-us/` | Contact Land Development Specialists \| Get Started | Contact us | yes |
| `/contact-us/privacy-policy/` | Our Privacy Policy \| Land Development Specialists | Privacy Policy | yes |
| `/contact-us/legal-notice/` | Legal Information \| Land Development Specialists | Legal Notice | yes |
| `/services/` | Services | Services | yes |
| `/services/land-development-project-management/` | Land Development Project Los Angeles \| Land Development Management Corona \| Land Development | End-to-End Land Development Project Management | yes |

### Preserved signals

- Google verification: `qt6BZBTht6J8LrOp4nDTJLAqQq7r6KwOOE3vhxvk-JQ`
- Analytics: `G-ELK6NKXXZY`
- Contact: `(760) 271-1081`, `brian@landDevSpec.net`, `P.O. Box 5833, Huntington Beach, CA 92615`
- Founder: Brian Woods
- Existing LocalBusiness schema used city-center coordinates and opening hours. The redesign uses ProfessionalService + PO Box instead of representing the mailing address as a staffed office.

### Legal pages

The live privacy and legal pages were unfilled IONOS placeholders. Headings are preserved. Verified company and contact details were filled. Business ID, VAT, and regulatory authority numbers were not published and were not invented.

## URL checklist

| Original | Redesign route | Expected status |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | 200 |
| `/about-us/` | `src/app/about-us/page.tsx` | 200 |
| `/contact-us/` | `src/app/contact-us/page.tsx` | 200 |
| `/contact-us/privacy-policy/` | `src/app/contact-us/privacy-policy/page.tsx` | 200 |
| `/contact-us/legal-notice/` | `src/app/contact-us/legal-notice/page.tsx` | 200 |
| `/services/` | `src/app/services/page.tsx` | 200 |
| `/services/land-development-project-management/` | `src/app/services/land-development-project-management/page.tsx` | 200 |
| unknown path | `src/app/not-found.tsx` | 404 |

## Metadata changes

Existing titles and homepage / about / contact descriptions were kept. New descriptions were added only where the live page had none (`/services/`, `/contact-us/privacy-policy/`, `/contact-us/legal-notice/`) or where the project-management page needed a description matching visible lead text.

## Missing integrations

- Contact form sends email only when `RESEND_API_KEY` is set. Until then, submission shows a recovery message with phone and email.
- IONOS cookie, translator, and Google Maps embeds were not rebuilt.
- Production DNS / go-live was not performed.

## Verification (local production build, 12 September 2026)

| Check | Result |
| --- | --- |
| 1. URL preservation | Pass. All 7 inventoried paths returned HTTP 200 with trailing slashes. `/labout-us/` and an unknown path returned 404. |
| 2. Content preservation | Pass for homepage, about, services hub, project management, contact, and legal headings. Privacy/legal placeholders were completed only with verified details. |
| 3. Search signals | Pass. Existing titles preserved. Self-referencing canonicals, sitemap, and robots.txt generated. Staging `noindex` applies when `NEXT_PUBLIC_SITE_URL` is a Hostinger or localhost host. |
| 4. Links and assets | Pass for internal routes and the supplied logo plus reused live-site project photos. |
| 5. Rendering | Pass. Main content and navigation are in server-rendered HTML. `npm run build` succeeded. |
| 6. Responsive layout | Not verified visually. No browser automation was available. Header includes a mobile menu. |
| 7. Accessibility | Partial. Visible labels, skip link, focus styles, and keyboard menu control are implemented. Contrast not measured with a tool. |
| 8. Contact functionality | Form validation is implemented. Email delivery is **not connected** until `RESEND_API_KEY` is set. Failed submissions show phone and email. |
| 9. Structured data | Implemented as ProfessionalService, WebSite, BreadcrumbList, Service, and FAQPage. Not submitted to Google’s rich-results tester. |
| 10. Performance | Next.js production build completed. No Lighthouse run. |

## Launch

1. Set `NEXT_PUBLIC_SITE_URL=https://www.landdevspec.net`.
2. Add Resend keys if the form should deliver email.
3. Deploy, then switch the domain only when asked.
4. After launch: confirm all seven URLs return 200, submit Search Console sitemap `https://www.landdevspec.net/sitemap.xml`, and watch inquiries.

Staging on `*.hostingersite.com` is set to `noindex`.
