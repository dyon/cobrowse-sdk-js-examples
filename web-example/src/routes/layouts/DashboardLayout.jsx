import throttle from 'lodash/throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'
import Main from '../../components/Main'
import Sidebar from '../../components/Sidebar'
import TransactionList from '../../components/TransactionList'
import { getTransactions, groupByMonth } from '../../utils/transactions'

export const loader = async () => {
  const transactions = groupByMonth(getTransactions())

  return { transactions }
}

const DashboardLayout = () => {
  const { transactions } = useLoaderData()
  const { pathname } = useLocation()
  const sidebarRef = useRef()
  const scrollableAreaRef = useRef()
  const previousYPositionRef = useRef(0)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const toggleSidebar = useCallback((target, direction) => {
    // If we are at the top of the sidebar, and we're scrolling up, shrink it
    if (sidebarRef.current?.contains(target) && direction === 'down' && sidebarExpanded && scrollableAreaRef.current?.scrollTop === 0) {
      setSidebarExpanded(false)

      return
    }

    if (direction === 'up' && !sidebarExpanded) {
      setSidebarExpanded(true)
    } else if (direction === 'down' && sidebarExpanded && !sidebarRef.current?.contains(target)) {
      setSidebarExpanded(false)
    }
  }, [sidebarExpanded])

  const onScroll = useCallback((e) => {
    const target = e.target
    const direction = e.deltaY > 0 ? 'up' : 'down'

    toggleSidebar(target, direction)
  }, [toggleSidebar])

  const onTouchMove = useCallback((e) => {
    const target = e.target
    const currentYPosition = e.touches[0].clientY
    const direction = currentYPosition > previousYPositionRef.current ? 'down' : 'up'

    toggleSidebar(target, direction)
  }, [toggleSidebar])

  const throttledOnScroll = throttle(onScroll, 400)
  const throttledOnTouchMove = throttle(onTouchMove, 400)

  useEffect(() => {
    const sidebar = sidebarRef.current
    const onTouchStart = (e) => {
      previousYPositionRef.current = e.touches[0].clientY
    }
    const onClick = () => {
      setSidebarExpanded((expanded) => !expanded)
    }

    window.addEventListener('wheel', throttledOnScroll, { passive: true })
    sidebar?.addEventListener('touchstart', onTouchStart, { passive: true })
    sidebar?.addEventListener('touchmove', throttledOnTouchMove, { passive: true })
    sidebar?.addEventListener('click', onClick, { passive: true })

    return () => {
      window.removeEventListener('wheel', throttledOnScroll)
      sidebar?.removeEventListener('touchstart', onTouchStart)
      sidebar?.removeEventListener('touchmove', throttledOnTouchMove)
      sidebar?.removeEventListener('click', onClick)
    }
  }, [throttledOnScroll, throttledOnTouchMove])

  return (
    <>
      <Main sidebarExpanded={sidebarExpanded}>
        <Outlet />
      </Main>
      <Sidebar ref={sidebarRef} className={pathname.includes('transactions/') ? 'hide' : ''}>
        <TransactionList
          transactions={transactions}
          sidebarExpanded={sidebarExpanded}
          ref={scrollableAreaRef}
        />
      </Sidebar>
    </>
  )
}

export default DashboardLayout
