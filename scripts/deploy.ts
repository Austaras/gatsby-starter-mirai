import { spawn } from 'child_process'
import path from 'path'

import { CONFIG } from '../src/config'

if (!CONFIG.rsync) {
  throw new Error('must specify rsync in config.yml')
}
const dir = path.resolve(__dirname, '../public') + '/'
const { rsync } = CONFIG

const cmd = 'rsync'
const args = ['-av', '-zz', '-progress']
if (rsync.del) args.push('--del')
if (rsync.port) args.push('-e', `ssh -p ${rsync.port}`)
args.push(dir, `${rsync.user}@${rsync.host}:${rsync.root}`)

const proc = spawn(cmd, args, {
  stdio: 'pipe',
  cwd: process.cwd(),
  env: process.env
})

proc.stdout.on('data', data => {
  console.log(data.toString())
})

proc.stderr.on('data', data => {
  console.error(data.toString())
})
