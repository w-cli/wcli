// copy from https://github.com/umijs/umi/blob/master/packages/babel-plugin-auto-css-modules/src/index.ts
import { Visitor } from '@babel/traverse'
import { extname } from 'path'

export interface IOpts {
  flag?: string
}

const CSS_EXTNAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl']

export default function() {
  return {
    visitor: {
      ImportDeclaration(path, { opts }: { opts: IOpts }) {
        const {
          specifiers,
          source,
          source: { value }
        } = path.node
        if (specifiers.length && CSS_EXTNAMES.includes(extname(value))) {
          source.value = `${value}?${opts.flag || 'modules'}`
        }
      }
    } as Visitor
  }
}
