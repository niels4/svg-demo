import {useState, useEffect} from 'react'

const ZOOM_SPEED = 0.1
const MAX_ZOOM_IN = 0.2
const MAX_ZOOM_OUT = 20

const createViewBoxString = (height, width, panX = 0, panY = 0, zoom = 1) =>
  `${parseInt(panX * zoom)} ${parseInt(panY * zoom)} ${parseInt(width * zoom)} ${parseInt(height * zoom)}`

export const usePanAndZoom = (svgRef) => {
  const [viewBoxString, setViewBoxString] = useState("0 0 1 1")

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) { return }
    let {height, width} = svg.getBoundingClientRect()
    let panX = 0
    let panY = 0
    let zoom = 1
    const updateViewbox = () => setViewBoxString(createViewBoxString(height, width, panX, panY, zoom))
    updateViewbox()

    const onResize = () => {
      const svgRect = svg.getBoundingClientRect()
      height = svgRect.height
      width = svgRect.width
      updateViewbox()
    }

    const onZoom = (e) => {
      zoom += ZOOM_SPEED * e.deltaY
      if (zoom > MAX_ZOOM_OUT) {
        zoom = MAX_ZOOM_OUT
      } else if (zoom < MAX_ZOOM_IN) {
        zoom = MAX_ZOOM_IN
      }
      updateViewbox()
      e.preventDefault()
    }

    window.addEventListener('resize', onResize)
    svg.addEventListener('wheel', onZoom)
    return () => {
      window.removeEventListener('resize', onResize)
      svg.removeEventListener('wheel', onZoom)
    }
  }, [svgRef])

  return viewBoxString
}
