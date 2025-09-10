import path from 'path'

const BLOG_POST_PATH = path.join(
  import.meta.dirname,
  '../blog-posts/my-first-feature-article.md'
)

const DB_URI = 'CSdb://username:password@localhost:27017/notarealdatabase'

export { BLOG_POST_PATH, DB_URI }
