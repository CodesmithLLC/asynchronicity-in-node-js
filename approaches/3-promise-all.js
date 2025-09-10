// dependencies
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mockDB from '../mocks/db.js'

// constants
import { BLOG_POST_PATH, DB_URI } from '../constants/constants.js'

const markdownIt = new MarkdownIt()

const connectToDBPromise = () => {
  return new Promise((resolve, reject) => {
    mockDB.connect(DB_URI, (err, data) => {
      if (err) reject(err)

      console.log('["data" from connectToDBPromise]', data)
      resolve()
    })
  })
}

const retrieveArticlePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(BLOG_POST_PATH, 'utf-8', (err, data) => {
      if (err) reject(err)

      console.log('["data" from retrieveArticlePromise]', data)

      const htmlData = markdownIt.render(data)
      const article = { articleContent: htmlData }
      resolve(article)
    })
  })
}

const saveArticleToDBPromise = (article) => {
  return new Promise((resolve, reject) => {
    mockDB.create(article, (err, data) => {
      if (err) reject(err)

      console.log('["data" from saveArticleToDBPromise]', data)
      resolve()
    })
  })
}

const promiseAll = () => {
  console.log('[running "promise.all" approach]' + '\n')

  // note: we can run the first two promises in parallel since they don't depend on each other
  // the third promise (saving to db) depends on both, so it should be run after the first two resolve
  Promise.all([connectToDBPromise(), retrieveArticlePromise()])
    .then((results) => {
      const article = results[1] // the article is the second result
      return saveArticleToDBPromise(article)
    })
    .catch((err) => console.error(err.message))
}

promiseAll()
