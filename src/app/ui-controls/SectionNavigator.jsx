import React from 'react'
import styles from './SectionNavigator.module.css'

export const SectionNavigator = ({sectionData = [], zoomTo}) => {
  return <div className={styles.section_navigator}>
    <span className={styles.title}>
      Zoom To:
    </span>
    {sectionData.map((section, i) => {
      return <span key={section.name} className={styles.section_button} onClick={() => zoomTo(sectionData[i], 50)}>
        {section.name}
      </span>
    })}
  </div>
}
