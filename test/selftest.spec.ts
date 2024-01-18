import { expect } from 'chai'
import dummyModule from './appleModule.js'
// works better than   import dummyModule from '../src/dummyModule.js'


describe('Self Test', () => {
  it('should assert that 1 + 1 equals 2', () => {
    expect(1 + 1).to.equal(2)
  })
  it('check on dummyModule', () => {
    expect(dummyModule.truth).to.equal(42)
  })
})
