//.mocharc.cjs
'use strict'

module.exports = {
  spec: ['test/**/*.spec.ts'],
  loader: 'ts-node/esm',
  node_Xoption: ["experimental-specifier-resolution=node"],
}
