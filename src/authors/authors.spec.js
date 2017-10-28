const { test } = require('ava')
const request = require('axios')
const moment = require('moment')

const server = require('../server')

test.beforeEach(async t => {
  // This runs after each test and other test hooks, even if they failed
  const rdb = require('rethinkdbdash')({
    servers: [{ host: process.env.RDB_HOST, port: process.env.RDB_PORT }]
  })
  const tableList = await rdb.tableList().run()
  if (tableList.includes('author')) {
    await rdb.tableDrop('author').run()
  }
})

// Run the server
server.start({ port: 0 }, (err, fastify) => {
  test.serial(
    'The authors endpoint should return an empty array when no entries are saved',
    async t => {
      if (err) t.fail()
      const response = await request.get(
        `http://localhost:${fastify.server.address().port}/authors`
      )
      t.is(response.status, 200)
      t.deepEqual(response.data, [])
    }
  )

  test.serial(
    'The authors endpoint should accept a POST call with a new author',
    async t => {
      if (err) t.fail()
      const input = {
        display_name: 'David Guijarro',
        email: 'guijarro.dav@gmail.com'
      }
      const output = {
        id: 'david-guijarro',
        display_name: 'David Guijarro',
        email: 'guijarro.dav@gmail.com'
      }

      const postResponse = await request.post(
        `http://localhost:${fastify.server.address().port}/authors`,
        input
      )
      t.is(postResponse.status, 201)
      const getResponse = await request.get(
        `http://localhost:${fastify.server.address().port}/authors`
      )
      t.is(getResponse.status, 200)
      t.deepEqual(getResponse.data, [output])
    }
  )
})
