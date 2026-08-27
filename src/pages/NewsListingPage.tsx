import { PageShell } from '../components/PageShell'
import { getNewsPosts } from '../data/newsPosts'

export function NewsListingPage() {
  const newsPosts = getNewsPosts()

  return (
    <PageShell currentPath="/news">
      <section className="content-shell news-page">
        <header className="content-page__header">
          <h1 className="page-title">News</h1>
          <img src="/images/flower_divider.png" alt="" className="content-page__divider" />
        </header>
        {newsPosts.length === 0 ? (
          <p>No news posts found.</p>
        ) : (
          <div className="news-list">
            {newsPosts.map((post) => (
              <a key={post.filePath} className="news-card" href={`/news/${post.slug}`}>
                <article className="news-content" dangerouslySetInnerHTML={{ __html: post.html }} />
              </a>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
