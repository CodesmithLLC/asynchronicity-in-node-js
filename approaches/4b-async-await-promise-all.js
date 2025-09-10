// dependencies
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mockDB from '../mocks/db.js'

// constants
import { BLOG_POST_PATH, DB_URI } from '../constants/constants.js'

const markdownIt = new MarkdownIt()

/*
  all of these functions are the same as before!
*/

const connectToDBPromise = () => {
  return new Promise((resolve, reject) => {
    mockDB.connect(DB_URI, (err, data) => {
      if (err) reject(err)

      // console.log('["data" from connectToDBPromise]', data)

      resolve()
    })
  })
}

const retrieveArticlePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(BLOG_POST_PATH, 'utf-8', (err, data) => {
      if (err) reject(err)

      // console.log('["data" from retrieveArticlePromise]', data)

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

      // console.log('["data" from saveArticleToDBPromise]', data)

      resolve(data)
    })
  })
}

const asyncAwaitWithPromiseAll = async () => {
  console.log('[running "async/await" approach with Promise.all()]' + '\n')

  try {
    const [_, article] = await Promise.all([
      connectToDBPromise(),
      retrieveArticlePromise(),
    ])

    const savedArticle = await saveArticleToDBPromise(article)

    console.log('saved article:', savedArticle)
  } catch (err) {
    console.error(err)
  }
}
asyncAwaitWithPromiseAll()
