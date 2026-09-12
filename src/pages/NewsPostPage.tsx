import { PageShell } from '../components/PageShell'
import { getNewsPostBySlug } from '../data/newsPosts'

interface NewsPostPageProps {
  slug: string
}

export function NewsPostPage({ slug }: NewsPostPageProps) {
  const post = getNewsPostBySlug(slug)

  if (!post) {
    return (
      <PageShell currentPath="/news">
        <section className="content-shell news-post-page">
          <a className="news-post-page__back" href="/news">
            ← Back to news
          </a>
          <h1>Post not found</h1>
          <p>The requested news post could not be found.</p>
        </section>
      </PageShell>
    )
  }

  return (
    <PageShell currentPath="/news">
      <section className="content-shell news-post-page">
        <a className="news-post-page__back" href="/news">
          ← Back to news
        </a>
        <article className="news-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    </PageShell>
  )
}
