const colors = [
  '#f00',
  '#ff0',
  '#55f',
  '#0f0',
  '#0ff'
]

let nextColorIndex = -1
export const resetColorIndex = () => { nextColorIndex = -1 }

export const nextColor = () => {
  if (nextColorIndex >= colors.length - 1) { resetColorIndex() }
  nextColorIndex += 1
  return colors[nextColorIndex]
}
