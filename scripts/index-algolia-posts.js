const parser = require('xml2json')
const fs = require('fs')
const path = require('path')
const algoliasearch = require('algoliasearch')

const rss = fs.readFileSync(path.resolve(__dirname, '../public/index.xml'), 'utf-8')
const json = parser.toJson(rss, { object: true })

const ALGOLIA_APPLICATION_ID = "OK2MQNJFKT"
const ALGOLIA_ADMIN_API_KEY = `${process.env.ALGOLIA_ADMIN_API_KEY}` // es inventado :P
const ALGOLIA_INDEX_NAME = "prod_blog_content"

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)

const posts = json.rss.channel.item.map(post => ({ ...post, objectID: post.guid }))

index.saveObjects(posts)
  .then(objectIds => {
    console.log({ objectIds })
  })
  .catch(err => {
    console.error(err)
  })
