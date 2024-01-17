'use strict'
console.log('███ .mocharc …')
module.exports = {
  // require: 'ts-node/register',
  loader: 'ts-node/esm',
  spec: ['test/**/*.spec.ts'],
}
