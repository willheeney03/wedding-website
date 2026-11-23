import './App.css'
import PhotoboothScroll from './PhotoboothScroll'

function App() {

  return (
    <>
      <main className="min-h-screen bg-stone-100">
        <PhotoboothScroll delay={0.8} duration={3}>
          <h2 className="font-serif text-3xl">We're getting married!</h2>
        </PhotoboothScroll>
        <div className="h-[50vh]" />
      </main>
    </>
  )
}

export default App
