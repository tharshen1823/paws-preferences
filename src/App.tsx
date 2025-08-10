import { useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import './styles.css'

function makeCatUrls(count = 16) {
  // slightly smaller for faster loads; tweak as you like
  const W = 500, H = 700
  return Array.from({ length: count }, (_, i) =>
    `https://cataas.com/cat?width=${W}&height=${H}&random=${Date.now()}_${i}`
  )
}

type Dir = 'left' | 'right' | 'up' | 'down'

export default function App() {
  const urls = useMemo(() => makeCatUrls(16), [])
  const [currentIndex, setCurrentIndex] = useState(urls.length - 1)
  const [liked, setLiked] = useState<string[]>([])
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain') // toggle Fit vs Fill

  const onSwipe = (dir: Dir, url: string, i: number) => {
    if (dir === 'right') setLiked(prev => [...prev, url])
    setCurrentIndex(i - 1)
  }

  const swipe = (dir: 'left' | 'right') => {
    if (currentIndex < 0) return
    if (dir === 'right') setLiked(prev => [...prev, urls[currentIndex]])
    setCurrentIndex(i => i - 1)
  }

  const finished = currentIndex < 0
  const nextIdx = Math.max(currentIndex - 1, 0)

  return (
    <div className="app">
      <header className="header">Paws & Preferences</header>

      {!finished ? (
        <>
          <div className="progress">{currentIndex + 1} left</div>

          <div className="deck">
            {urls.slice(0, currentIndex + 1).map((url, i) => (
              <TinderCard
            key={url}
            className="tc"  
            onSwipe={(dir) => onSwipe(dir as Dir, url, i)}
            preventSwipe={['up', 'down']}
            flickOnSwipe
            swipeRequirementType="position"
            swipeThreshold={70}
            >
              <div className="card" style={{ zIndex: i + 1 }}>
                <img
                  src={url}
                  alt={`Cat ${i + 1}`}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: fitMode, background: '#000' }}
                />
                <div className="label">Cat #{i + 1}</div>
              </div>
            </TinderCard>
            ))}
          </div>


          <div className="controls">
            <button
              className="btn"
              onClick={() => setFitMode(m => (m === 'contain' ? 'cover' : 'contain'))}
            >
              {fitMode === 'contain' ? 'Fill (crop)' : 'Fit (no crop)'}
            </button>
            <button className="btn btn-skip" onClick={() => swipe('left')}>Dislike</button>
            <button className="btn btn-like" onClick={() => swipe('right')}>Like</button>
          </div>
        </>
      ) : (
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

      <footer className="controls" style={{ opacity: .7 }}>
        <small>Images from CATAAS</small>
      </footer>
    </div>
  )
}
