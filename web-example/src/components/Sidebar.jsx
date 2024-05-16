import styles from './Sidebar.module.css'
import { forwardRef } from 'react'

const Sidebar = forwardRef(({ expanded = false, className, children }, ref) => {
  const isMobile = !window.matchMedia('(min-width: 740px)').matches

  return (
    <nav className={`${styles.sidebar} ${expanded && isMobile ? styles.expanded : ''} ${className}`} ref={ref}>
      {children}
    </nav>
  )
})

export default Sidebar
