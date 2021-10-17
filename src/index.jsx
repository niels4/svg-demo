import React from 'react'
import ReactDOM from 'react-dom'
import {useLiveImport} from './data/liveImport.js'
import './global.css'

const rootElement = document.getElementById('app_root')

const LiveApp = () => {
  const {SvgCanvas} = useLiveImport('src/app/svg-canvas/SvgCanvas.jsx')
  const {HtmlOverlay} = useLiveImport('src/app/ui-controls/HtmlOverlay.jsx')
  if (!SvgCanvas || !HtmlOverlay) { return "loading..." }
  return <>
    <SvgCanvas />
    <HtmlOverlay />
  </>
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
