import {useState, useEffect} from 'react'

const ZOOM_SPEED = 20

export const usePanAndZoom = (svgRef, height, width) => {
  const [zoom, setZoom] = useState(1)
  const minZoom = Math.min(height, width) * -1 + 0.1
  let totalDeltaY = 0
  const onZoom = (e) => {
    const nextZoom = ZOOM_SPEED * (totalDeltaY + e.deltaY)
    if (nextZoom < minZoom) {
      setZoom(minZoom)
    } else {
      totalDeltaY += e.deltaY
      setZoom(nextZoom)
    }
    e.preventDefault()
  }
  useEffect(() => {
    const svg = svgRef.current
    svg && svg.addEventListener('wheel', onZoom)
    return () => {
      svg && svg.removeEventListener('wheel', onZoom)
    }
  }, [svgRef, height, width])

  return {zoom}
}
