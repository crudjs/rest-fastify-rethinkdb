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
  if (tableList.includes('entry')) {
    await rdb.tableDrop('entry').run()
  }
})

// Run the server
server.start({ port: 0 }, (err, fastify) => {
  test.serial(
    'The entries endpoint should return an empty array when no entries are saved',
    async t => {
      if (err) t.fail()
      const response = await request.get(
        `http://localhost:${fastify.server.address().port}/entries`
      )
      t.is(response.status, 200)
      t.deepEqual(response.data, [])
    }
  )

  test.serial(
    'The entries endpoint should accept a POST call with a new entry',
    async t => {
      if (err) t.fail()
      const input = {
        title: 'Hello World',
        body:
          'This is a test lksdflk fsdkjfs sldkfjsa lsdkafjl fsdkkljsf dskfjs dfsj ldskfjl sdfj lsdkfjsl dfkjs ldf fsldkfjsldf sdsfkj sdlfk sdfksdjf sldkfj sldkfj sldkf sdfj lsdkfjlsdkflskdfj sdflsdfj',
        authorId: 'david-guijarro',
        categoryId: 'this-is-category-two'
      }
      const output = {
        id: 'hello-world',
        title: 'Hello World',
        body:
          'This is a test lksdflk fsdkjfs sldkfjsa lsdkafjl fsdkkljsf dskfjs dfsj ldskfjl sdfj lsdkfjsl dfkjs ldf fsldkfjsldf sdsfkj sdlfk sdfksdjf sldkfj sldkfj sldkf sdfj lsdkfjlsdkflskdfj sdflsdfj',
        authorId: 'david-guijarro',
        categoryId: 'this-is-category-two',
        cheers: 0
      }

      const postResponse = await request.post(
        `http://localhost:${fastify.server.address().port}/entries`,
        input
      )
      Object.assign(output, {
        created_at: moment()
          .seconds(0)
          .milliseconds(0)
          .toISOString()
      })
      t.is(postResponse.status, 201)
      const getResponse = await request.get(
        `http://localhost:${fastify.server.address().port}/entries`
      )
      t.is(getResponse.status, 200)
      t.deepEqual(getResponse.data, [output])
    }
  )
})
