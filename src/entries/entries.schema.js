module.exports = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            body: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            authorId: { type: 'string' },
            categoryId: { type: 'string' },
            cheers: { type: 'integer' }
          }
        }
      }
    }
  }
}
