import React from 'react'
import {sectionData} from 'src/data/sectionData.js'
import {SectionNavigator} from './SectionNavigator.js'

export const HtmlOverlay = ({zoomTo}) => {
  return <div className="html_overlay">
    <SectionNavigator sectionData={sectionData} zoomTo={zoomTo} />
  </div>
}
