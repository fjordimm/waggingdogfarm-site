import { PageShell } from '../components/PageShell'
import { getNewsPosts } from '../data/newsPosts'

export function NewsListingPage() {
  const newsPosts = getNewsPosts()

  return (
    <PageShell currentPath="/news">
      <section className="news-page-card">
        <h1>News</h1>
        {newsPosts.length === 0 ? (
          <p>No news posts found.</p>
        ) : (
          <div className="news-list">
            {newsPosts.map((post) => (
              <a key={post.filePath} className="news-card" href={`/news/${post.slug}`}>
                <article className="news-card__content" dangerouslySetInnerHTML={{ __html: post.html }} />
              </a>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
