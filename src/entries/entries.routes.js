const schema = require('./entries.schema')

module.exports = async (fastify, options) => {
  fastify.get('/entries', schema, (req, reply) => {
    reply.send([
      {
        id: 'hello',
        title: 'Hello',
        body: 'This is a test entry',
        created_at: '1996-12-19T16:39:57-08:00',
        authorId: 'david-guijarro',
        categoryId: 'basic-category',
        cheers: 0
      }
    ])
  })
}
