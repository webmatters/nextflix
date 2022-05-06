import styles from './SectionCards.module.css'
import Card from './Card'

export default function SectionCards(props) {
  const { title, videos = [], size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Card id={index} imgUrl={video.imgUrl} size={size} key={index} />
        ))}
      </div>
    </section>
  )
}
