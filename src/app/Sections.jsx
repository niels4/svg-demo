import React from 'react'

export const Section = ({x, y, height, width, name}) => <>
  <rect x={x} y={y} width={width} height={height} stroke='#eee'
    fill="none" strokeWidth="2" rx="8" strokeDasharray='10' />
  <text x={x + 10} y={y + 25} fontSize="22" fill="#bbb" fontFamily="maven-bold">{name}</text>
</>

export const Sections = ({data}) => data.map(({x, y, height, width, name}) => <Section
  key={name} x={x} y={y} height={height} width={width} name={name} />)
