import { describe, it, expect, assert } from 'vitest'

import dummyModule from '../src/dummyModule'

describe('Self Test', () => {

  it('should assert that 1 + 1 equals 2', () => {
    expect(1 + 1).toBe(2)
    assert.strictEqual(1 + 1, 2)
  })

  it('check on dummyModule', () => {
    expect(dummyModule.truth).toBe(42)
    assert.strictEqual(dummyModule.truth, 42)
  })

})
