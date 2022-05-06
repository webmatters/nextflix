import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from 'styles/Login.module.css'
import { magic } from 'lib/magic-client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const handleOnChangeEmail = event => {
    setUserMsg('')
    setEmail(event.target.value)
  }

  const handleLogin = async e => {
    if (email) {
      if (email === 'bodhicoder@gmail.com') {
        try {
          setIsLoading(true)
          const didToken = await magic.auth.loginWithMagicLink({ email })
          if (didToken) {
            router.push('/')
          }
        } catch (error) {
          console.error('Something went wrong signing in', error)
          setIsLoading(false)
        }
      } else {
        setUserMsg('There was a problem signing you in.')
      }
    } else {
      setUserMsg('Please enter a valid email address.')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  height="34px"
                  width="128px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email"
            onChange={handleOnChangeEmail}
          />
          {userMsg && <p className={styles.userMsg}>{userMsg}</p>}
          <button className={styles.loginBtn} onClick={handleLogin}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  )
}
