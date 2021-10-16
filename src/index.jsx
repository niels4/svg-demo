import React from 'react'
import ReactDOM from 'react-dom'
import {useLiveImport} from './data/liveImport.js'
import './global.css'

const rootElement = document.getElementById('app_root')

const LiveApp = () => {
  const {SvgOverlay} = useLiveImport('src/app/SvgOverlay.jsx')
  if (!SvgOverlay) { return "loading..." }
  return <SvgOverlay />
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError (err) {
    return {hasError: err}
  }

  componentDidCatch (error, errorInfo) {
    console.log("APP ERROR:", error, errorInfo)
  }

  render () {
    return <LiveApp />
  }
}

ReactDOM.render(<App />, rootElement)
