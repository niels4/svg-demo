import React from 'react'
import {useWindowSize} from 'src/data/clientData.js'

const viewBoxString = (height, width) => `${0} ${0} ${width} ${height}`

export const SvgOverlay = () => {
  const {height, width} = useWindowSize()

  return <svg className='svg_overlay' viewBox={viewBoxString(height, width)} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <circle cx={42} cy={75} r="10" fill="#f00" />
  </svg>
}
