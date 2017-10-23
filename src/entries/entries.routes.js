const slug = require('slug')
const moment = require('moment')

const db = require('../connectors/db')
const schema = require('./entries.schema')

module.exports = async (fastify, options) => {
  fastify.get('/entries', schema, async (req, reply) => {
    const all = await db.getAll('entry')
    return all
    // reply.send([
    //   {
    //     id: 'hello',
    //     title: 'Hello',
    //     body: 'This is a test entry',
    //     created_at: '1996-12-19T16:39:57-08:00',
    //     authorId: 'david-guijarro',
    //     categoryId: 'basic-category',
    //     cheers: 0
    //   }
    // ])
  })
  fastify.post('/entries', schema, async (req, reply) => {
    const entryToSave = Object.assign({}, req.body, {
      id: slug(req.body.title, { lower: true }),
      cheers: 0,
      created_at: moment()
        .seconds(0)
        .milliseconds(0)
        .toISOString()
    })
    await db.saveOne('entry', entryToSave)
    reply.code(201)
    return {}
  })
}
