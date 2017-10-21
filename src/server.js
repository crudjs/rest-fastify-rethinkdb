const fastify = require('fastify')()
const helmet = require('fastify-helmet')

fastify.register(helmet)
fastify.register(require('./entries/entries.routes'))

// Run the server!
fastify.listen(process.env.PORT || 3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
