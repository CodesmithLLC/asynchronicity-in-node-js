// dependencies
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mockDB from '../mocks/db.js'

// constants
import { BLOG_POST_PATH, DB_URI } from '../constants/constants.js'

const markdownIt = new MarkdownIt()

const callbacksRefactored = () => {
  console.log('[running "callbacks refactored" approach]' + '\n')

  mockDB.connect(DB_URI, connectToDBCallback)
}

const connectToDBCallback = (err, data) => {
  if (err) return console.error('db connection error:', err.message) // error handling

  console.log('["data" from connectToDBCallback]', data)

  fs.readFile(BLOG_POST_PATH, 'utf-8', retrieveArticleCallback)
}

const retrieveArticleCallback = (err, data) => {
  if (err) return console.error('readfile error:', err.message) // error handling

  console.log('["data" from retrieveArticleCallback]', data)

  const htmlData = markdownIt.render(data) // parse markdown data to HTML
  const article = { articleContent: htmlData }

  mockDB.create(article, saveArticleToDBCallback)
}

const saveArticleToDBCallback = (err, data) => {
  if (err) return console.error('db submission error:', err.message) // error handling

  console.log('["data" from saveArticleToDBCallback]', data)
}

callbacksRefactored()
