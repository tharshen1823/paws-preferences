import TinderCard from 'react-tinder-card'

export default function TestSwipe() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background:'#111' }}>
      <div style={{ position: 'relative', width: 320, height: 480 }}>
        <TinderCard
          onSwipe={(d) => console.log('swiped', d)}
          preventSwipe={['up', 'down']}
        >
          <div style={{
            position:'absolute', inset:0, borderRadius:16, background:'#333',
            display:'grid', placeItems:'center', color:'#fff', fontSize:24
          }}>
            Swipe me
          </div>
        </TinderCard>
      </div>
    </div>
  )
}
