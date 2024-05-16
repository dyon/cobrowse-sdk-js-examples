import styles from './Main.module.css'

const Main = ({ sidebarExpanded = false, children }) => {
  return (
    <main className={`${styles.main} ${sidebarExpanded ? styles.shrink : ''}`}>
      {children}
    </main>
  )
}

export default Main
