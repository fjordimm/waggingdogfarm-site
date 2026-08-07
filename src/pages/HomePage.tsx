import { PageShell } from '../components/PageShell'
import { getBlogPosts } from '../data/blogPosts'

export function HomePage() {
  const blogPosts = getBlogPosts().slice(0, 3)

  return (
    <PageShell variant="home" currentPath="/">
      <div className="home-panel">
        <h1 className="home-title">Wagging Dog Farm</h1>

        <section className="hero-panel">
          <div className="instagram-embed-wrapper">
            <iframe
              className="instagram-embed"
              src="https://www.igrecent.com/instagram-viewer/posts?username=waggingdogfarm&source=home"
              title="Wagging Dog Farm Instagram"
              loading="lazy"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </section>

        <section className="hero-panel home-blog-preview">
          <h2 className="blog-preview-title">Latest from the blog</h2>
          {blogPosts.length === 0 ? (
            <p>No posts available yet.</p>
          ) : (
            <>
              <div className="blog-list">
                {blogPosts.map((post) => (
                  <a key={post.filePath} className="blog-card" href={`/blog/${post.slug}`}>
                    <article className="blog-card__content" dangerouslySetInnerHTML={{ __html: post.html }} />
                  </a>
                ))}
              </div>
              <div className="blog-preview-footer">
                <a className="view-all-posts-link" href="/blog">
                  View all posts
                </a>
              </div>
            </>
          )}
        </section>
      </div>
    </PageShell>
  )
}
