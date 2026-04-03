import app from '../index.js'

import request from 'supertest'

import { users } from '../data.js'

describe('GraphQL API', () => {
  test('given id => should return getUser(id)', async () => {
    const query = `
    query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        name
        email
      }
    }
    `

    const userId = '1'

    const response = await request(app)
      .post('/graphql')
      .send({
        query: query,
        variables: { id: userId },
      })
    const expectedUser = users.find((user) => user.id === userId)

    expect(response.status).toBe(200)
    expect(response.body.data.getUser.name).toBe(expectedUser?.name)
  })

  test('given id => should return null', async () => {
    const query = `
    query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        name
        email
      }
    }
    `

    const userId = '1000'

    const response = await request(app)
      .post('/graphql')
      .send({
        query: query,
        variables: { id: userId },
      })

    expect(response.status).toBe(200)
    expect(response.body.data.getUser).toBeNull()
  })

  test('given limit => should return listUsers(limit)', async () => {
    const query = `
    query GetUsers($limit: Int!) {
      listUsers(limit: $limit) {
        id
        name
        email
      }
    }
    `

    const limit = 2

    const response = await request(app)
      .post('/graphql')
      .send({
        query: query,
        variables: { limit: limit },
      })
    const responseUsers = response.body.data.listUsers ?? []
    expect(response.status).toBe(200)
    expect(responseUsers).toBeInstanceOf(Array)
    expect(responseUsers).toHaveLength(limit)
  })
})
