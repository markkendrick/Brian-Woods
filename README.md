# Brian Woods / Land Development Specialists LLC

## Monthly client report

The work log is `docs/customer-log.md`. Each month’s client PDF is `docs/customer-log/YYYY-MM.pdf`.

Build the current Pacific month:

```bash
npm run report:month
```

Build one month, for example September 2026:

```bash
npm run report:month -- 2026-09
```

The command needs Python 3.9 or newer and uses only the standard library. It does not install packages, and it does not build or deploy the website. The same script without npm:

```bash
python3 scripts/customer-log-pdf.py 2026-09
```

Write the log for Brian Woods. Leave out SourceTree, the All tags checkbox, localhost addresses, branch names, commit hashes, and mentions of AI tools. Keep finished work apart from recommendations: start suggestions with `Recommendations.` so they print in their own section. When a page is submitted in Search Console, write Indexing requested. The new site is still a preview at the Hostinger staging address. The public site stays https://www.landdevspec.net/ until that domain is switched.

The report uses the Land Development Specialists header: navy, gold, and cream. Review the latest file, `docs/customer-log/2026-09.pdf`, before sending it.
