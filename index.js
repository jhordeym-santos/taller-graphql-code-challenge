import express from 'express'

import { createHandler } from 'graphql-http/lib/use/express'

const app = express()

import { schema } from './schema.js'

app.all('/graphql', createHandler({
  schema
}))

app.listen(4000, () => {
  console.log('server is running in port 4000')
})
