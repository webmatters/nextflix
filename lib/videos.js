export async function getVideos(searchQuery) {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'
  const queryString = `part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_API_KEY}`

  const response = await fetch(`${BASE_URL}/search?${queryString}`)
  const data = await response.json()

  if (data?.error) {
    console.error('YouTube API error', data.error)
    return []
  }

  return data?.items.map(item => {
    return {
      title: item?.snippet?.title || null,
      imgUrl: item?.snippet?.thumbnails?.high?.url || null,
      id: item?.id?.videoId || null,
    }
  })
}
