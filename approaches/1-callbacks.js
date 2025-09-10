// dependencies
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mockDB from '../mocks/db.js'

// constants
import { BLOG_POST_PATH, DB_URI } from '../constants/constants.js'

const markdownIt = new MarkdownIt()

const callbacks = () => {
  console.log('[running "callbacks" approach]' + '\n')

  // step 1: connect to mock db
  // CALLBACK 1 --> once we have connected, we can proceed!
  mockDB.connect(DB_URI, (err, data) => {
    if (err) return console.error('db connection error:', err.message) // error handling

    console.log('["data" from callback 1]', data)

    // step 2: retrieve article (i.e. read file) from filesystem
    // CALLBACK 2 --> once we've read the file, we can proceed.
    // (change BLOG_POST_PATH to a nonexistent path to simulate an error)
    fs.readFile(BLOG_POST_PATH, 'utf-8', (err, data) => {
      if (err) return console.error('readfile error:', err.message) // error handling

      console.log('["data" from callback 2]', data)

      const htmlData = markdownIt.render(data) // parse markdown data to HTML
      const article = { articleContent: htmlData }

      // step 3: save the article to mock db
      // CALLBACK 3 --> once we've created and saved the article in the db, we can proceed.
      mockDB.create(article, (err, data) => {
        if (err) return console.error('db submission error:', err.message) // error handling

        console.log('["data" from callback 3]', data)
      })
    })
  })
}

callbacks()
