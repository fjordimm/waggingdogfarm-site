export interface NewsPost {
  slug: string
  title: string
  html: string
  filePath: string
}

const newsPostModules = import.meta.glob('../assets/generated/news_posts/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function getSlugFromFilePath(filePath: string) {
  const fileName = filePath.split('/').pop() ?? filePath
  return fileName.replace(/\.html$/, '')
}

function getTitleFromHtml(html: string, fallback: string) {
  const headingMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
  if (!headingMatch) return fallback

  const text = headingMatch[1].replace(/<[^>]+>/g, '').trim()
  return text || fallback
}

export function getNewsPosts(): NewsPost[] {
  return Object.entries(newsPostModules)
    .filter(([filePath]) => filePath.endsWith('.html'))
    .map(([filePath, html]) => ({
      slug: getSlugFromFilePath(filePath),
      title: getTitleFromHtml(html, getSlugFromFilePath(filePath)),
      html,
      filePath,
    }))
    .sort((a, b) => a.filePath.localeCompare(b.filePath))
}

export function getNewsPostBySlug(slug: string) {
  return getNewsPosts().find((post) => post.slug === slug)
}
