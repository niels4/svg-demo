import React, {useRef, useEffect} from 'react'
import {useWindowSize} from 'src/data/clientData.js'
import {usePanAndZoom} from 'src/controls/PanAndZoom.js'

const colors = [
  '#f00',
  '#ff0',
  '#55f',
  '#0f0',
  '#0ff'
]
let nextColorIndex = -1
const nextColor = () => {
  if (nextColorIndex >= colors.length - 1) { nextColorIndex = -1 }
  nextColorIndex += 1
  return colors[nextColorIndex]
}

const RoundedRect = ({x, y, height, width, color = nextColor()}) => {
  return <rect x={x} y={y} width={width} height={height} stroke={color}
    fill="none" strokeWidth="3" rx="8" />
}

const viewBoxString = (height, width, pan, zoom) => `${pan.x} ${pan.y} ${width * zoom} ${height * zoom}`

export const SvgOverlay = () => {
  const svgRef = useRef()
  const {height, width} = useWindowSize()
  const {pan, zoom} = usePanAndZoom(svgRef, height, width)
  useEffect(() => { nextColorIndex = -1 })

  return <svg className='svg_overlay' ref={svgRef} viewBox={viewBoxString(height, width, pan, zoom)} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <RoundedRect x={120} y={100} height={200} width={100} />
    <RoundedRect x={120} y={400} height={200} width={800} />
    <RoundedRect x={420} y={50} height={300} width={500} />
    <RoundedRect x={1400} y={800} height={300} width={500} />
    <RoundedRect x={2400} y={200} height={800} width={500} />
    <RoundedRect x={200} y={1600} height={800} width={500} />
    <RoundedRect x={4200} y={1600} height={800} width={500} />
    <RoundedRect x={4000} y={120} height={800} width={500} />
    <RoundedRect x={2000} y={1600} height={300} width={800} />
    <RoundedRect x={2000} y={2000} height={300} width={800} />
    <RoundedRect x={8000} y={4500} height={300} width={800} />
    <RoundedRect x={6000} y={4000} height={900} width={800} />
    <RoundedRect x={7200} y={4000} height={200} width={800} />
  </svg>
}
