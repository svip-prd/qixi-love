import { useState, useEffect } from 'react'
import './Welcome.css'

function Welcome({ onEnter }) {
  const [hearts, setHearts] = useState([])
  
  useEffect(() => {
    // 创建飘落的爱心动画
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2
      }
      setHearts(prev => [...prev, newHeart])
      
      // 清理旧的爱心
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id))
      }, 5000)
    }, 800)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="welcome-container">
      {/* 飘落的爱心背景 */}
      <div className="hearts-background">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="falling-heart"
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.animationDuration}s`
            }}
          >
            💖
          </div>
        ))}
      </div>
      
      <div className="welcome-content">
        <h1 className="main-title">
          <span className="title-text">致我最爱的你</span>
          <div className="title-decoration">💕</div>
        </h1>
        
        <div className="subtitle">
          <p>在这个特殊的七夕节</p>
          <p>我想对你说出心中的话语</p>
        </div>
        
        <div className="greeting-text">
          <p>愿我们的爱情如繁星般永恒</p>
          <p>如月亮般温柔</p>
          <p>如太阳般温暖</p>
        </div>
        
        <button className="enter-button" onClick={onEnter}>
          <span>进入我们的爱情世界</span>
          <div className="button-decoration">✨</div>
        </button>
        
        <div className="date-display">
          <span>七夕节 - {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default Welcome