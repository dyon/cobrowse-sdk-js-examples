import styles from './ExternalTransactionView.module.css'

const BASE_URL = 'https://cobrowseio.github.io/cobrowse-sdk-ios-examples/'

const ExternalTransactionView = ({ title, date, amount, category }) => (
  <iframe
    className={styles.frame}
    title='frame'
    src={`${BASE_URL}?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(date)}&amount=${encodeURIComponent(amount)}&category=${encodeURIComponent(category)}`}
    allowFullScreen={true}
  ></iframe>
)

export default ExternalTransactionView
