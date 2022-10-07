// Call to api url


const { parse } = require('rss-to-json');

const fs = require('fs');
const path = require('path');
const algoliasearch = require('algoliasearch');
const ALGOLIA_APPLICATION_ID = `OK2MQNJFKT`
const ALGOLIA_ADMIN_API_KEY = `${process.env.ALGOLIA_ADMIN_API_KEY}`;
const ALGOLIA_INDEX_NAME = `prod_blog_content`;

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)

parse('https://blog.usarr.tech/index.xml').then(rss => {
    const out = JSON.stringify(rss, null, 3)
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
    //Use addObjects to add the array of posts to the index

})