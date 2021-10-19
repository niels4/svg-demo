import {useState, useEffect} from 'react'
import {animateZoomTo} from './animateZoomTo.js'

const ZOOM_SPEED = 0.02
const MAX_ZOOM_IN = 1
const MAX_ZOOM_OUT = 20

const createViewBoxString = (height, width, panX = 0, panY = 0, zoom = 1) =>
  `${panX} ${panY} ${width * zoom} ${height * zoom}`

export const usePanAndZoom = (svgRef, initialZoom = {}) => {
  const [viewBoxString, setViewBoxString] = useState("0 0 1 1")
  const [zoomTo, setZoomTo] = useState(() => {})

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) { return }
    let svgHeight = 1
    let svgWidth = 1
    let panX = initialZoom.panX || 0
    let panY = initialZoom.panY || 0
    let zoom = initialZoom.zoom || 1
    let isPanning = false
    const updateViewbox = () => setViewBoxString(createViewBoxString(svgHeight, svgWidth, panX, panY, zoom))
    onResize()

    function onResize () {
      const svgRect = svg.getBoundingClientRect()
      svgHeight = svgRect.height
      svgWidth = svgRect.width
      updateViewbox()
    }

    const onZoom = (e) => {
      if (isPanning) { return }
      const cx = panX + zoom * svgWidth / 2
      const cy = panY + zoom * svgHeight / 2

      zoom += ZOOM_SPEED * e.deltaY
      if (zoom > MAX_ZOOM_OUT) {
        zoom = MAX_ZOOM_OUT
      } else if (zoom < MAX_ZOOM_IN) {
        zoom = MAX_ZOOM_IN
      }

      // maintain center as we zoom in and out
      const newCx = panX + zoom * svgWidth / 2
      const newCy = panY + zoom * svgHeight / 2
      panX += (cx - newCx)
      panY += (cy - newCy)

      updateViewbox()
      e.preventDefault()
    }

    let dragStartX, dragStartY
    const onPanDrag = (e) => {
      const diffX = dragStartX - e.clientX
      const diffY = dragStartY - e.clientY
      panX += diffX * zoom
      panY += diffY * zoom
      dragStartX = e.clientX
      dragStartY = e.clientY
      updateViewbox()
    }
    const onPanEnd = () => {
      isPanning = false
      window.removeEventListener('mouseup', onPanEnd)
      window.removeEventListener('mousemove', onPanDrag)
    }
    const onPanStart = (e) => {
      if (e.target !== svg) { return }
      isPanning = true
      dragStartX = e.clientX
      dragStartY = e.clientY
      window.addEventListener('mouseup', onPanEnd)
      window.addEventListener('mousemove', onPanDrag)
      e.preventDefault()
    }

    // using state to store the zoomTo function to make sure it is run in the same context as
    // the rest of the pan and zoom controls
    setZoomTo(() => ({x, y, height, width}, buffer = 0) => {
      const endPanX = x - buffer
      const endPanY = y - buffer
      const heightRatio = height / svgHeight
      const widthRatio = width / svgWidth
      let endZoom
      if (widthRatio > heightRatio) {
        endZoom = (width + 2 * buffer) / svgWidth
      } else {
        endZoom = (height + 2 * buffer) / svgHeight
      }
      animateZoomTo(panX, panY, zoom, endPanX, endPanY, endZoom, (newPanX, newPanY, newZoom) => {
        panX = newPanX
        panY = newPanY
        zoom = newZoom
        updateViewbox()
      })
    })

    window.addEventListener('resize', onResize)
    svg.addEventListener('wheel', onZoom)
    svg.addEventListener('mousedown', onPanStart)
    return () => { // cleanup function
      window.removeEventListener('resize', onResize)
      svg.removeEventListener('wheel', onZoom)
      svg.removeEventListener('mousedown', onPanStart)
      window.removeEventListener('mouseup', onPanEnd)
      window.removeEventListener('mousemove', onPanDrag)
    }
  }, [svgRef])

  return {viewBoxString, zoomTo}
}
