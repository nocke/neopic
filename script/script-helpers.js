import { execSync } from 'child_process'

export const exec = (command, options = {}) => {
  console.log('exec:', command)
  return execSync(command, { encoding: 'utf8', ...options }).trim()
}

export const log = console.log
export const warn = console.warn
export const errLog = console.error // `error` to collision-prone
