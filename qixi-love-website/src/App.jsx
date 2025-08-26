import { useState } from 'react'
import Welcome from './components/Welcome'
import Confession from './components/Confession'
import Gallery from './components/Gallery'
import InteractiveGames from './components/InteractiveGames'
import WishBottle from './components/WishBottle'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('welcome')

  const renderSection = () => {
    switch (currentSection) {
      case 'welcome':
        return <Welcome onEnter={() => setCurrentSection('confession')} />
      case 'confession':
        return <Confession onNext={() => setCurrentSection('gallery')} />
      case 'gallery':
        return <Gallery onNext={() => setCurrentSection('games')} />
      case 'games':
        return <InteractiveGames onNext={() => setCurrentSection('wish')} />
      case 'wish':
        return <WishBottle onNext={() => setCurrentSection('contact')} />
      case 'contact':
        return <Contact onBack={() => setCurrentSection('welcome')} />
      default:
        return <Welcome onEnter={() => setCurrentSection('confession')} />
    }
  }

  return (
    <div className="app">
      <nav className="navigation">
        <button 
          className={currentSection === 'welcome' ? 'active' : ''}
          onClick={() => setCurrentSection('welcome')}
        >
          🏠 首页
        </button>
        <button 
          className={currentSection === 'confession' ? 'active' : ''}
          onClick={() => setCurrentSection('confession')}
        >
          💝 告白
        </button>
        <button 
          className={currentSection === 'gallery' ? 'active' : ''}
          onClick={() => setCurrentSection('gallery')}
        >
          📸 回忆
        </button>
        <button 
          className={currentSection === 'games' ? 'active' : ''}
          onClick={() => setCurrentSection('games')}
        >
          🎮 互动
        </button>
        <button 
          className={currentSection === 'wish' ? 'active' : ''}
          onClick={() => setCurrentSection('wish')}
        >
          🌠 许愿
        </button>
        <button 
          className={currentSection === 'contact' ? 'active' : ''}
          onClick={() => setCurrentSection('contact')}
        >
          📞 留言
        </button>
      </nav>
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  )
}

export default App
