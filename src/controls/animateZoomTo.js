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
    const newPanX = sPanX + percentComplete * diffPanX
    const newPanY = sPanY + percentComplete * diffPanY
    const newZoom = sZoom + percentComplete * diffZoom
    update(newPanX, newPanY, newZoom)
  }
  animate()
}
