import app from '../index.js'

describe('app', () => {
  it('exports an express app', () => {
    expect(typeof app).toBe('function')
  })
})
