const t = require('tap')
const test = t.test
const request = require('request')
const server = require('../server')

// Run the server
server.start({ port: 0 }, (err, fastify) => {
  t.error(err)

  test('The entries endpoint should return an array', t => {
    t.plan(5)
    // Perform the request
    request(
      {
        method: 'GET',
        uri: `http://localhost:${fastify.server.address().port}/entries`
      },
      (err, response, body) => {
        const json = JSON.parse(body)
        // Unit test
        t.error(err)
        t.strictEqual(response.statusCode, 200)
        t.strictEqual(response.headers['content-length'], '' + body.length)
        t.type(json, Array)
        t.type(json[0], 'object')
        fastify.close()
      }
    )
  })
})
