import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import styles from './Navbar.module.css'
import { magic } from 'lib/magic-client'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { email } = await magic.user.getMetadata()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.error('There was a problem getting the user data', error)
      }
    }
    getUserData()
  }, [])

  const router = useRouter()

  const handleSignout = async event => {
    try {
      await magic.user.logout()
      console.log(await magic.user.isLoggedIn())
      router.push('/login')
    } catch (error) {
      console.error('There was an error signing the user out.', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <Link href="/">
            <a>
              <li className={styles.navItem}>Home</li>
            </a>
          </Link>
          <Link href="/browse/my-list">
            <a>
              <li className={styles.navItem}>My List</li>
            </a>
          </Link>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="expand icon"
                width="28"
                height="28"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
