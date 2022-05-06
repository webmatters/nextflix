import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import '../styles/globals.css'
import { magic } from 'lib/magic-client'
import Loading from 'components/loading/Loading'

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }

    const isUserLoggedIn = async () => {
      try {
        if (await magic.user.isLoggedIn()) {
          router.push('/')
          router.events.on('routeChangeComplete', handleComplete)
          router.events.on('routeChangeError', handleComplete)
        } else {
          router.push('/login')
          router.events.on('routeChangeComplete', handleComplete)
          router.events.on('routeChangeError', handleComplete)
        }
      } catch (error) {
        console.error('There was an error getting user logged in state.', error)
      }
    }

    isUserLoggedIn()

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
