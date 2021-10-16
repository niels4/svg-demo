import {useState, useEffect} from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth})
  const onResize = () => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth})
  }
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return windowSize
}

export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState({scrollX: window.scrollX, scrollY: window.scrollY})
  const onScroll = () => {
    setWindowScroll({scrollX: window.scrollX, scrollY: window.scrollY})
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return windowScroll
}
