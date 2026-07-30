import { PageShell } from '../components/PageShell'
import { getBlogPostBySlug } from '../data/blogPosts'

interface BlogPostPageProps {
  slug: string
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return (
      <PageShell currentPath="/blog">
        <section className="blog-post-page">
          <a className="blog-post-page__back" href="/blog">
            ← Back to blog
          </a>
          <h1>Post not found</h1>
          <p>The requested blog post could not be found.</p>
        </section>
      </PageShell>
    )
  }

  return (
    <PageShell currentPath="/blog">
      <section className="blog-post-page">
        <a className="blog-post-page__back" href="/blog">
          ← Back to blog
        </a>
        <article className="blog-post-page__content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    </PageShell>
  )
}
