module.exports = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            display_name: { type: 'string' },
            email: { type: 'string', format: 'email' }
          }
        }
      }
    }
  }
}
