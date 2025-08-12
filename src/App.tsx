import { useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import './styles.css'

/**
 * Generates an array of random cat image URLs from cataas.com.
 * @param count - Number of image URLs to generate.
 * Uses Date.now() to prevent caching and ensure uniqueness.
 */
function makeCatUrls(count = 16) {
  const W = 500, H = 700 // Fixed dimensions for faster load & consistent layout
  return Array.from({ length: count }, (_, i) =>
    `https://cataas.com/cat?width=${W}&height=${H}&random=${Date.now()}_${i}`
  )
}

type Dir = 'left' | 'right' | 'up' | 'down'

export default function App() {
  // Pre-generate image URLs only once per session
  const urls = useMemo(() => makeCatUrls(16), [])
  const [currentIndex, setCurrentIndex] = useState(urls.length - 1) // Tracks which card is on top
  const [liked, setLiked] = useState<string[]>([]) // Stores URLs of liked cats

  /**
   * Handles swipe gestures from react-tinder-card.
   * @param dir - Direction of the swipe.
   * @param url - Image URL for the swiped card.
   * @param i - Index of the card in the deck.
   */
  const onSwipe = (dir: Dir, url: string, i: number) => {
    if (dir === 'right') setLiked(prev => [...prev, url]) // Only 'right' counts as like
    setCurrentIndex(i - 1) // Move to the next card down the stack
  }

  /**
   * Handles button-triggered swipes (left/dislike or right/like).
   * This bypasses drag gestures.
   */
  const swipe = (dir: 'left' | 'right') => {
    if (currentIndex < 0) return // No cards left
    if (dir === 'right') setLiked(prev => [...prev, urls[currentIndex]])
    setCurrentIndex(i => i - 1)
  }

  const finished = currentIndex < 0 // True when all cards have been swiped

  return (
    <div className="app">
      <header className="header">Paws & Preferences</header>

      {!finished ? (
        <>
          {/* Progress indicator */}
          <div className="progress">{currentIndex + 1} left</div>

          {/* Card stack */}
          <div className="deck">
            {urls.slice(0, currentIndex + 1).map((url, i) => (
              <TinderCard
                key={url}
                className="tc"
                onSwipe={(dir) => onSwipe(dir as Dir, url, i)}
                preventSwipe={['up', 'down']} // Only allow left/right swipes
                flickOnSwipe
                swipeRequirementType="position"
                swipeThreshold={70} // Min px drag to register a swipe
              >
                <div className="card" style={{ zIndex: i + 1 }}>
                  <img
                    src={url}
                    alt={`Cat ${i + 1}`}
                    loading={i < 3 ? 'eager' : 'lazy'} // Preload top cards for smoother UX
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000' }}
                  />
                  <div className="label">Cat #{i + 1}</div>
                </div>
              </TinderCard>
            ))}
          </div>

          {/* Manual control buttons */}
          <div className="controls">
            <button className="btn btn-skip" onClick={() => swipe('left')}>Dislike</button>
            <button className="btn btn-like" onClick={() => swipe('right')}>Like</button>
          </div>
        </>
      ) : (
        // Summary screen after all cards are swiped
        <div className="summary">
          <h2>You liked {liked.length} out of {urls.length}</h2>
          <div className="grid">
            {liked.map(u => (
              <img
                src={u}
                key={u}
                alt="liked cat"
                loading="lazy"
                style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 12 }}
              />
            ))}
          </div>
          <div className="controls">
            <button className="btn" onClick={() => location.reload()}>Try again</button>
          </div>
        </div>
      )}

      {/* Footer attribution */}
      <footer className="controls" style={{ opacity: .7 }}>
        <small>Images from CATAAS</small>
      </footer>
    </div>
  )
}
