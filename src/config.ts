import fs from 'fs'
import YAML from 'js-yaml'

interface Config {
  template: {
    blog: {
      path: string
      date: string
    }
  }
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

let yaml: DeepPartial<Config> = {}

try {
  yaml = YAML.safeLoad(fs.readFileSync('config.yml', 'utf8'))
} catch {
  console.log('config not exists!')
}

export const config = yaml
