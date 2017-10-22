const rdb = require('rethinkdbdash')({
  servers: [{ host: process.env.RDB_HOST, port: process.env.RDB_PORT }]
})

const getAll = async entity => {
  try {
    const tableList = await rdb.tableList().run()
    if (!tableList.includes(entity)) {
      await rdb.tableCreate(entity).run()
    }
    const entities = await rdb.table(entity).run()
    return entities
  } catch (err) {
    console.error(err)
    return err
  }
}

module.exports = { getAll }
