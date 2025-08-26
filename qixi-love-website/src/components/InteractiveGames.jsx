import { useState, useEffect } from 'react'
import './InteractiveGames.css'

function InteractiveGames({ onNext }) {
  const [heartRain, setHeartRain] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [score, setScore] = useState(0)
  
  const sweetQuotes = [
    "你是我心中永不落的太阳 ☀️",
    "愿与你看遍世间繁华 🌸",
    "因为有你，世界变得温柔 🌙",
    "你的笑容是我最美的风景 🌺",
    "想和你一起变成更好的人 ✨",
    "每一天都想给你不同的惊喜 🎁",
    "你是我生命中最美的意外 💫",
    "愿时光不老，我们不散 ⏳",
    "你是我心中最珍贵的宝藏 💎",
    "因为爱你，所以勇敢 💪"
  ]
  
  // 爱心雨游戏
  const startHeartRain = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90,
        y: -10,
        speed: 2 + Math.random() * 3,
        size: 20 + Math.random() * 20
      }
      setHeartRain(prev => [...prev, newHeart])
    }, 200)
    
    // 5秒后停止
    setTimeout(() => {
      setIsPlaying(false)
      clearInterval(interval)
      setTimeout(() => setHeartRain([]), 3000)
    }, 5000)
  }
  
  // 更新爱心位置
  useEffect(() => {
    if (heartRain.length > 0) {
      const interval = setInterval(() => {
        setHeartRain(prev => 
          prev.map(heart => ({
            ...heart,
            y: heart.y + heart.speed
          })).filter(heart => heart.y < 100)
        )
      }, 50)
      
      return () => clearInterval(interval)
    }
  }, [heartRain])
  
  // 点击爱心
  const catchHeart = (heartId) => {
    setScore(prev => prev + 1)
    setHeartRain(prev => prev.filter(heart => heart.id !== heartId))
  }
  
  // 随机情话生成器
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * sweetQuotes.length)
    setCurrentQuote(randomIndex)
  }
  
  // 重置游戏
  const resetGame = () => {
    setScore(0)
    setHeartRain([])
    setIsPlaying(false)
  }

  return (
    <div className="games-container">
      <div className="games-content">
        <h2 className="games-title">
          🎮 爱的小游戏
        </h2>
        
        {/* 爱心雨游戏 */}
        <div className="heart-rain-game">
          <h3>💖 爱心雨</h3>
          <p>点击飘落的爱心，收集我们的爱意吧！</p>
          
          <div className="game-stats">
            <span>得分: {score} 💕</span>
            {isPlaying && <span className="playing-indicator">游戏进行中...</span>}
          </div>
          
          <div className="game-area">
            {heartRain.map(heart => (
              <div
                key={heart.id}
                className="falling-game-heart"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  fontSize: `${heart.size}px`
                }}
                onClick={() => catchHeart(heart.id)}
              >
                💖
              </div>
            ))}
          </div>
          
          <div className="game-controls">
            <button 
              className="game-btn start-btn" 
              onClick={startHeartRain}
              disabled={isPlaying}
            >
              {isPlaying ? '游戏中...' : '开始游戏'}
            </button>
            <button className="game-btn reset-btn" onClick={resetGame}>
              重新开始
            </button>
          </div>
        </div>
        
        {/* 情话生成器 */}
        <div className="quote-generator">
          <h3>💝 甜蜜话语生成器</h3>
          <div className="quote-display">
            <p className="generated-quote">
              {sweetQuotes[currentQuote]}
            </p>
          </div>
          <button className="generate-btn" onClick={generateRandomQuote}>
            ✨ 生成新的甜蜜话语
          </button>
        </div>
        
        {/* 音乐控制 */}
        <div className="music-section">
          <h3>🎵 背景音乐</h3>
          <p>（这里可以添加浪漫的背景音乐）</p>
          <div className="music-controls">
            <button className="music-btn">🎵 播放</button>
            <button className="music-btn">⏸️ 暂停</button>
            <button className="music-btn">🔀 切换</button>
          </div>
        </div>
        
        <div className="games-decoration">
          <span>🌟</span>
          <span>💕</span>
          <span>🌟</span>
          <span>💖</span>
          <span>🌟</span>
        </div>
        
        <button className="next-button" onClick={onNext}>
          许下心愿 🌠
        </button>
      </div>
    </div>
  )
}

export default InteractiveGames