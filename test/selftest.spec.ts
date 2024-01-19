import { expect, assert } from 'chai'
// works not      import dummyModule from '../src/dummyModule'
// works better   import dummyModule from '../src/dummyModule.js'
// works import dummyModule from './appleModule.js'
import dummyModule from '../src/dummyModule.js'

describe('Self Test', () => {
  it('should assert that 1 + 1 equals 2', () => {
    expect(1 + 1).to.equal(2)
    assert.strictEqual(1 + 1, 2)
  })
  it('check on dummyModule', () => {
    expect(dummyModule.truth).to.equal(42)
    assert.strictEqual(dummyModule.truth, 42)
  })
})
