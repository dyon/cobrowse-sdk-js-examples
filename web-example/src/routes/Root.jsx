import { Outlet } from 'react-router-dom'
import Content from '../components/Content'
import Header from '../components/Header'

const Root = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}

export default Root
