// test/selftest.spec.ts
import { expect, assert } from 'chai'

describe('Embedded Test', () => {
  it('embedded should assert that 1 + 1 equals 2', () => {
    expect(1 + 1).to.equal(2)
    assert.strictEqual(1 + 1, 2)
  })
})
