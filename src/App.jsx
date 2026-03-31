import './index.css'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NewsSection from './components/NewsSection'
import Features from './components/Features'
import CTASection from './components/CTASection'
import './styles/Background.css'
import './styles/Navbar.css'
import './styles/Hero.css'
import './styles/NewsSection.css'
import './styles/Features.css'
import './styles/CTASection.css'

function App() {
  return (
    <>
      <Background />
      <div className="app-content">
        <Navbar />
        <Hero />
        <NewsSection />
        <Features />
        <CTASection />
      </div>
    </>
  )
}

export default App