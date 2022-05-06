import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import styles from 'styles/Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')

  const handleOnChangeEmail = e => {
    setUserMsg('')
    setEmail(e.target.value)
  }

  const handleLogin = e => {
    if (email) {
      // route to home page
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
            Sign In
          </button>
        </div>
      </main>
    </div>
  )
}
