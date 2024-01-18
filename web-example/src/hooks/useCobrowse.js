import { useCallback, useEffect, useRef, useState } from 'react'
import CobrowseIO from 'cobrowse-sdk-js'

export const useCobrowse = () => {
  const [cobrowsing, setCobrowsing] = useState(() => CobrowseIO.currentSession?.isActive())
  const cobrowseStarted = useRef(false)

  useEffect(() => {
    const onCobrowseStart = (session) => {
      if (session.isActive()) {
        setCobrowsing(true)
      }
    }
    const onCobrowseEnd = (session) => {
      setCobrowsing(false)
    }

    CobrowseIO.on('session.updated', onCobrowseStart)
    CobrowseIO.on('session.ended', onCobrowseEnd)

    return () => {
      CobrowseIO.off('session.updated', onCobrowseStart)
      CobrowseIO.off('session.ended', onCobrowseEnd)
    }
  }, [])

  const start = useCallback(({ api, license, redactedViews, customData, capabilities } = {}) => {
    if (cobrowseStarted.current) {
      return
    }

    if (api) {
      CobrowseIO.api = api
    }

    if (Array.isArray(capabilities)) {
      CobrowseIO.capabilities = capabilities
    }

    console.log({ api, license, redactedViews, customData, capabilities })

    CobrowseIO.license = license || 'trial'
    CobrowseIO.redactedViews = redactedViews || ['.redacted']
    CobrowseIO.customData = customData || {}
    CobrowseIO.showSessionControls = () => false
    CobrowseIO.hideSessionControls = () => false

    CobrowseIO.start()

    cobrowseStarted.current = true
  }, [])

  const stop = () => {
    CobrowseIO.stop()

    cobrowseStarted.current = false
  }

  const endSession = () => {
    CobrowseIO.currentSession?.end()
  }

  const createSessionCode = async () => {
    return await CobrowseIO.createSessionCode()
  }

  const present = (code) => {
    CobrowseIO.getSession(code)
  }

  const setCustomData = (data) => {
    CobrowseIO.customData = data
  }

  return {
    cobrowsing,
    start,
    stop,
    endSession,
    createSessionCode,
    present,
    setCustomData
  }
}