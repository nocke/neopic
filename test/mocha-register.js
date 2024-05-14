import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
register('ts-node/esm', pathToFileURL('./'))

// REF https://github.com/nodejs/node/issues/51196#issuecomment-1998216742
