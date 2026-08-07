# Usage

## Development

To test in development, do:
```
npm run dev
```

To generate blog posts into `src/assets/generated/blog_posts` (and delete the old ones), run:
```
node .\scripts\fetch_blog_posts_and_generate.ts
```

## Production

Developed for a Cloudflare site. Cloudflare will do `npm run build` on its own end.
Cloudflare will use the `main` branch.

# Development Environment

- Windows 11
- CPU: 12th Gen Intel(R) Core(TM) i7-1260P
- GPU: Intel(R) Iris(R) Xe Graphics
