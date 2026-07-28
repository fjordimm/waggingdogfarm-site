import { PageShell } from '../components/PageShell'
import { getBlogPosts } from '../data/blogPosts'

export function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <PageShell currentPath="/blog">
      <section className="blog-list-page">
        <h1>Blog</h1>
        {blogPosts.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <div className="blog-list">
            {blogPosts.map((post) => (
              <a key={post.filePath} className="blog-card" href={`/blog/${post.slug}`}>
                <article className="blog-card__content" dangerouslySetInnerHTML={{ __html: post.html }} />
              </a>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
