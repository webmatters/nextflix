import styles from './SectionCards.module.css'
import Card from './Card'

export default function SectionCards(props) {
  const { title, videos = [], size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map(video => (
          <Card
            id={video.id}
            imgUrl={video.imgUrl}
            size={size}
            key={video.id}
          />
        ))}
      </div>
    </section>
  )
}
