# Newsletters

PDFs dropped in this folder are published at the site root when the site
deploys. A file saved as:

    public/newsletters/Volume-1--Issue-2--September-2025.pdf

is served at:

    https://soower.org/newsletters/Volume-1--Issue-2--September-2025.pdf

That URL is what goes into the **link** field on the Upload (bulk email) page,
which puts a "View newsletter" card in the email instead of attaching the file.

Use links rather than attachments for anything sizeable. Netlify rejects any
request to `/api/bulk-email` over roughly 4.4MB before our code runs, so a large
PDF cannot be attached — but a link has no size limit, and keeps the email light
enough that mail clients don't clip it.

Naming: keep it descriptive and URL-safe (no spaces). Spaces become `%20`, which
survives but reads badly in the card, since the filename shown to donors is
taken from the last segment of the URL.

Note these files are committed to the repo and ship with every deploy, so a few
megabytes each is fine but they do accumulate. If this grows past a handful of
issues, move them to the S3 bucket the backend already uses
(`sower-bucket.s3.amazonaws.com`) and paste those URLs instead — the email side
works identically with any public http(s) URL.
