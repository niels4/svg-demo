import {useState, useEffect} from 'react'

const ZOOM_SPEED = 0.1
const MAX_ZOOM_IN = 1
const MAX_ZOOM_OUT = 20

const createViewBoxString = (height, width, panX = 0, panY = 0, zoom = 1) =>
  `${panX} ${panY} ${width * zoom} ${height * zoom}`

export const usePanAndZoom = (svgRef) => {
  const [viewBoxString, setViewBoxString] = useState("0 0 1 1")

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) { return }
    let {height, width} = svg.getBoundingClientRect()
    let panX = 0
    let panY = 0
    let zoom = 1
    let isPanning = false
    const updateViewbox = () => setViewBoxString(createViewBoxString(height, width, panX, panY, zoom))
    updateViewbox()

    const onResize = () => {
      const svgRect = svg.getBoundingClientRect()
      height = svgRect.height
      width = svgRect.width
      updateViewbox()
    }

    const onZoom = (e) => {
      if (isPanning) { return }
      const cx = panX + zoom * width / 2
      const cy = panY + zoom * height / 2

      zoom += ZOOM_SPEED * e.deltaY
      if (zoom > MAX_ZOOM_OUT) {
        zoom = MAX_ZOOM_OUT
      } else if (zoom < MAX_ZOOM_IN) {
        zoom = MAX_ZOOM_IN
      }

      // maintain center as we zoom in and out
      const newCx = panX + zoom * width / 2
      const newCy = panY + zoom * height / 2
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
      isPanning = true
      dragStartX = e.clientX
      dragStartY = e.clientY
      window.addEventListener('mouseup', onPanEnd)
      window.addEventListener('mousemove', onPanDrag)
      e.preventDefault()
    }

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

  return viewBoxString
}
