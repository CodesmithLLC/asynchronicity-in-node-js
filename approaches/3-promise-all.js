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

// near-identical to the saveArticleToDB in the original 'promises' approach, just a different input passed in
const saveArticleToDBPromiseAlt = (resolvedPromiseArray) => {
  const article = resolvedPromiseArray[1]
  // what would we see if we tried to log the 0th element?

  return new Promise((resolve, reject) => {
    mockDB.create(article, (err, data) => {
      if (err) reject(err)

      console.log('["data" from saveArticleToDBPromiseAlt]', data)

      resolve(data)
    })
  })
}

const promiseAll = () => {
  console.log('[running "Promise.all()" approach]' + '\n')

  // Promise.all() returns an array of pending promises
  Promise.all([connectToDBPromise(), retrieveArticlePromise()])
    .then((data) => saveArticleToDBPromiseAlt(data))
    .catch((err) => console.error(err.message))
}
promiseAll()
