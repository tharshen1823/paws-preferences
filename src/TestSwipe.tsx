import TinderCard from 'react-tinder-card'

/**
 * Minimal example component to test Tinder-style swipe gestures.
 * This is meant for development/debugging and not part of the main UI.
 */
export default function TestSwipe() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#111'
      }}
    >
      <div style={{ position: 'relative', width: 320, height: 480 }}>
        <TinderCard
          onSwipe={(d) => console.log('swiped', d)} // Log swipe direction for debugging
          preventSwipe={['up', 'down']} // Only allow horizontal swipes
        >
          {/* Test card UI */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              background: '#333',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontSize: 24
            }}
          >
            Swipe me
          </div>
        </TinderCard>
      </div>
    </div>
  )
}
