const slug = require('slug')

const db = require('../connectors/db')
const schema = require('./authors.schema')

module.exports = async (fastify, options) => {
  fastify.get('/authors', schema, async (req, reply) => {
    const all = await db.getAll('author')
    return all
  })
  fastify.post('/authors', async (req, reply) => {
    const authorToSave = Object.assign({}, req.body, {
      id: slug(req.body.display_name, { lower: true })
    })
    await db.saveOne('author', authorToSave)
    reply.code(201)
    return {}
  })
}
