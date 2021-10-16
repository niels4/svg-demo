import * as Babel from '@babel/standalone'
import {useState, useEffect} from 'react'
import {subscribe, unsubscribe} from './liveTextClient.js'

const importSource = src => import(`data:text/javascript;utf-8,${encodeURIComponent(src)}`)

export const useLiveImport = (path) => {
  const [module, setModule0] = useState({})
  let isClosed = false
  const setModule = (module) => !isClosed && setModule0(module)

  useEffect(() => {
    const isJsx = path.endsWith('.jsx')
    const importPath = isJsx ? path.substring(0, path.length - 1) : path
    import(importPath).then(setModule)
    const sub = {id: path, name: path, handle: (text) => {
      if (isClosed) { return }
      if (isJsx) {
        text = Babel.transform(text, {presets: ['react']}).code
      }
      importSource(text).then(setModule)
    }}
    subscribe(sub)
    return () => {
      isClosed = true
      unsubscribe(sub)
    }
  }, [])
  return module
}
