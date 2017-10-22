const { test } = require('ava')
const request = require('axios')
const server = require('../server')

// Run the server
server.start({ port: 0 }, (err, fastify) => {
  test('The entries endpoint should return an empty array', async t => {
    if (err) t.fail()
    const response = await request.get(
      `http://localhost:${fastify.server.address().port}/entries`
    )
    t.is(response.status, 200)
    t.deepEqual(response.data, [])
  })
})
