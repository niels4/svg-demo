const DURATION = 1000

export const animateZoomTo = (sPanX, sPanY, sZoom, ePanX, ePanY, eZoom, update) => {
  const start = Date.now()
  const end = start + DURATION
  const diffPanX = ePanX - sPanX
  const diffPanY = ePanY - sPanY
  const diffZoom = eZoom - sZoom
  const animate = () => {
    const now = Date.now()
    if (now >= end) {
      update(ePanX, ePanY, eZoom)
      return
    }
    window.requestAnimationFrame(animate)
    const percentComplete = (now - start) / DURATION
    const newPanX = sPanX + Math.sin(percentComplete * Math.PI / 2) * diffPanX
    const newPanY = sPanY + Math.sin(percentComplete * Math.PI / 2) * diffPanY
    const newZoom = sZoom + Math.sin(percentComplete * Math.PI / 2) * diffZoom
    update(newPanX, newPanY, newZoom)
  }
  animate()
}
