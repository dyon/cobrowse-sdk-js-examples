import styles from './Sidebar.module.css'
import { forwardRef } from 'react'

const Sidebar = forwardRef(({ children }, ref) => {
  return (
    <nav className={styles.sidebar} ref={ref}>
      {children}
    </nav>
  )
})

export default Sidebar
