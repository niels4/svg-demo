import React, {useRef, useEffect} from 'react'
import {usePanAndZoom} from 'src/controls/PanAndZoom.js'
import {nextColor, resetColorIndex} from 'src/themes/default.js'
import {Sections} from 'src/app/Sections.js'

const sectionData = [
  {name: "A", x: -30, y: -30, width: 3000, height: 2500},
  {name: "A-1", x: 30, y: 30, width: 1000, height: 610},
  {name: "A-2", x: 1950, y: 1550, width: 900, height: 810},
  {name: "B", x: 5950, y: 3950, width: 2900, height: 1000}
]

const RoundedRect = ({x, y, height, width, color = nextColor()}) => {
  return <rect x={x} y={y} width={width} height={height} stroke={color}
    fill="none" strokeWidth="6" rx="8" />
}

export const SvgOverlay = () => {
  const svgRef = useRef()
  const {viewBoxString, zoomTo} = usePanAndZoom(svgRef)
  useEffect(resetColorIndex)

  window.zoomToSection = (i) => zoomTo(sectionData[i], 50)

  return <svg className='svg_overlay' ref={svgRef} viewBox={viewBoxString} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
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
    <Sections data={sectionData} />
  </svg>
}
