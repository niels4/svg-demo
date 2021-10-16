import {useState, useEffect} from 'react'

const ZOOM_SPEED = 0.1
const MAX_ZOOM_IN = 0.2
const MAX_ZOOM_OUT = 20

export const usePan = (svgRef) => {
  const [pan, setPan] = useState({x: 0, y: 0})
  let currentPan = pan
  const panStart = {x: pan.x, y: pan.y}
  const panMouseStart = {x: 0, y: 0}

  const onPanDrag = (e) => {
    const diffX = panMouseStart.x - e.clientX
    const diffY = panMouseStart.y - e.clientY
    currentPan = {x: panStart.x + diffX, y: panStart.y + diffY}
    setPan(currentPan)
    e.preventDefault()
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) { return }

    const onPanStart = (e) => {
      panMouseStart.x = e.clientX
      panMouseStart.y = e.clientY
      panStart.x = currentPan.x
      panStart.y = currentPan.y
      window.addEventListener('mouseup', onPanEnd)
      window.addEventListener('mousemove', onPanDrag)
      e.preventDefault()
    }
    const onPanEnd = (e) => {
      window.removeEventListener('mousemove', onPanDrag)
      e.preventDefault()
    }
    svg.addEventListener('mousedown', onPanStart)
    return () => {
      svg.removeEventListener('mousedown', onPanStart)
      window.removeEventListener('mouseup', onPanEnd)
      window.removeEventListener('mousemove', onPanDrag)
    }
  }, [svgRef])

  return {pan}
}

export const useZoom = (svgRef, height, width) => {
  const [zoom, setZoom] = useState(1)
  let totalDeltaY = 0
  const onZoom = (e) => {
    const nextZoom = 1 + ZOOM_SPEED * (totalDeltaY + e.deltaY)
    if (nextZoom > MAX_ZOOM_OUT) {
      setZoom(MAX_ZOOM_OUT)
    } else if (nextZoom < MAX_ZOOM_IN) {
      setZoom(MAX_ZOOM_IN)
    } else {
      totalDeltaY += e.deltaY
      setZoom(nextZoom)
    }
    e.preventDefault()
  }
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) { return }
    svg.addEventListener('wheel', onZoom)

    // disable zoom when mouse button is pressed
    const onMouseUp = () => {
      svg.addEventListener('wheel', onZoom)
      window.removeEventListener('mouseup', onMouseUp)
    }
    const onMouseDown = () => {
      svg.removeEventListener('wheel', onZoom)
      window.addEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousedown', onMouseDown)

    return () => {
      svg.removeEventListener('wheel', onZoom)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [svgRef, height, width])

  return {zoom}
}

export const usePanAndZoom = (svgRef, height, width) => {
  const {zoom} = useZoom(svgRef, height, width)
  const {pan} = usePan(svgRef)
  return {pan, zoom}
}
