import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import cls from 'classnames'

import styles from './Card.module.css'

export default function Card({
  imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80',
  size = 'medium',
  id,
}) {
  const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80'
    )
  }

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={scale}
        className={cls(styles.imgMotionWrapper, classMap[size])}
      >
        <Image
          src={imgSrc}
          alt="TBD"
          layout="fill"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  )
}
