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

      resolve() // we don't *need* to pass in data here - why?
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
      if (err) return reject(err)

      console.log('["data" from saveArticleToDBPromise]', data)

      resolve(data)
    })
  })
}

const promises = () => {
  console.log('[running "promises" approach]' + '\n')

  connectToDBPromise()
    .then(() => retrieveArticlePromise())
    .then((data) => saveArticleToDBPromise(data))
    .then((data) => console.log('[final resolved data]', data)) // (we don't NEED to do this)
    .catch((err) => console.error(err.message))
}
promises()
