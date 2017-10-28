const minimist = require('minimist')
const fastify = require('fastify')()
const helmet = require('fastify-helmet')

fastify.register(helmet)
fastify.register([
  require('./status/status.routes'),
  require('./entries/entries.routes'),
  require('./authors/authors.routes')
])

const start = (opts, callback) => {
  fastify.listen(opts.port, err => {
    callback(err, fastify)
  })
}

// In this way you can run the server both from the CLI and as a required module.
if (require.main === module) {
  // Run the server with:
  // $ node server.js -p 8080
  start(
    minimist(process.argv.slice(2), {
      integer: ['port'],
      alias: {
        port: 'p'
      },
      default: {
        port: 3000
      }
    }),
    (err, instance) => {
      if (err) throw err
      console.log(`server listening on ${instance.server.address().port}`)
    }
  )
}

// Here we are exposing the function that starts the server
// in this way inside the test files we can require and run it.
module.exports = { start }
