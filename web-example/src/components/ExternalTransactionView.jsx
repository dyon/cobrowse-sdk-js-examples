import styles from './ExternalTransactionView.module.css'

const BASE_URL = 'https://cobrowseio.github.io/cobrowse-sdk-ios-examples/'

const ExternalTransactionView = ({ title, date, amount, category }) => (
  <iframe
    className={styles.frame}
    title='frame'
    src={`${BASE_URL}?title=${title}&subtitle=${date}&amount=${amount}&category=${category}`}
    allowFullScreen={true}
  ></iframe>
)

export default ExternalTransactionView
