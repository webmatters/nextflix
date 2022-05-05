import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './Navbar.module.css'

export default function Navbar({ username }) {
  const [showDropdown, setShowDropdown] = useState(false)

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
                  <Link href="/login">
                    <a className={styles.linkName}>Sign Out</a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
