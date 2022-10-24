
const { parse } = require('rss-to-json')

const algoliasearch = require('algoliasearch')
const ALGOLIA_APPLICATION_ID = 'OK2MQNJFKT'
const ALGOLIA_ADMIN_API_KEY = '5165093840593a74fa0bcb082144620d'
const ALGOLIA_INDEX_NAME = 'prod_blog_content'

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)

try {
    parse('https://blog.usarr.tech/index.xml').then(rss => {
        const posts = rss.items.map(post => {
            return {
                objectID: post.guid,
                title: post.title,
                description: post.description,
                link: post.link,
                pubDate: post.published,
                createdAt: post.created,
                category: post.category
            }
        }
        )
        index.saveObjects(posts, { autoGenerateObjectIDIfNotExist: true })
    })
} catch (error) {
    console.error(error)
}
