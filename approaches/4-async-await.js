// dependencies
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mockDB from '../mocks/db.js'
import { promisify } from 'util'

// constants
import { BLOG_POST_PATH, DB_URI } from '../constants/constants.js'

const markdownIt = new MarkdownIt()

// promisify callback-based functions
const readFileAsync = promisify(fs.readFile)
const connectToDBAsync = promisify(mockDB.connect)
const saveArticleToDBAsync = promisify(mockDB.create)

const asyncAwait = async () => {
  console.log('[running "async-await" approach]' + '\n')

  try {
    // step 1: connect to mock db
    const connectionData = await connectToDBAsync(DB_URI)
    console.log('["data" from connectToDBAsync]', connectionData)

    // step 2: retrieve article (i.e. read file) from filesystem
    const fileData = await readFileAsync(BLOG_POST_PATH, 'utf-8')
    console.log('["data" from readFileAsync]', fileData)

    const htmlData = markdownIt.render(fileData) // parse markdown data to HTML
    const article = { articleContent: htmlData }

    // step 3: save the article to mock db
    const savedData = await saveArticleToDBAsync(article)
    console.log('["data" from saveArticleToDBAsync]', savedData)
  } catch (err) {
    console.error(err.message)
  }
}

asyncAwait()
