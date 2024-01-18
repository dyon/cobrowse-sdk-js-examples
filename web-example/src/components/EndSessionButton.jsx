import { useCobrowse } from '../hooks/useCobrowse'
import Button from './Button'
import Icon from './Icon'

const EndSessionButton = () => {
  const { cobrowsing, endSession } = useCobrowse()

  if (!cobrowsing) {
    return false
  }

  return (
    <Button variant='plain' onClick={endSession}>
      <Icon name='cancel_presentation'/>
    </Button>
  )
}

export default EndSessionButton
