import styles from './Icon.module.css'
import * as icons from '../icons/icons'

const Icon = ({ name, ...props }) => {
  const iconName = name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  const IconComponent = icons[iconName]

  return (
    <IconComponent width='0px' height='100%' className={styles.icon} {...props} />
  )
}

export default Icon
