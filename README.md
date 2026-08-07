# Usage

## Development

To test in development, do:
```
npm run dev
```

---

To generate blog posts into `src/assets/generated/blog_posts` (and delete the old ones), run:
```
node .\scripts\fetch_blog_posts_and_generate.ts
```
...from the repository's root directory. Note that you must have the Notion secrets in `secrets/notion.txt`. The first line of the file should be the Notion workspace API key, and the second line should be the database id of the blog posts. There is a GitHub Action set up to do this automatically (with GitHub Secrets).

## Production

Developed for a Cloudflare site. Cloudflare will do `npm run build` on its own end.
Cloudflare will use the `main` branch. Anything committed to the `main` branch will automatically update the Cloudflare site.

# Development Environment

- Windows 11
- CPU: 12th Gen Intel(R) Core(TM) i7-1260P
- GPU: Intel(R) Iris(R) Xe Graphics
