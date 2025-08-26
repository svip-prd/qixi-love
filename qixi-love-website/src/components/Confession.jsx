import { useState } from 'react'
import './Confession.css'

function Confession({ onNext }) {
  const [customName, setCustomName] = useState('亲爱的')
  const [customMessage, setCustomMessage] = useState('')
  const [selectedLoveQuote, setSelectedLoveQuote] = useState(0)
  
  const loveQuotes = [
    "遇见你，是我这辈子最美好的意外",
    "愿与你共度春夏秋冬，看遍人间烟火",
    "你是我心中最亮的星，照亮我前行的路",
    "因为有你，每一天都充满了意义",
    "想和你一起慢慢变老，一起看夕阳西下",
    "你的笑容是我最珍贵的宝藏",
    "在这个世界上，只有你能让我如此心动"
  ]
  
  const handleQuoteChange = () => {
    setSelectedLoveQuote((prev) => (prev + 1) % loveQuotes.length)
  }

  return (
    <div className="confession-container">
      <div className="confession-content">
        <h2 className="confession-title">
          💝 我想对你说
        </h2>
        
        <div className="name-section">
          <label>称呼:</label>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="name-input"
            placeholder="输入专属称呼..."
          />
        </div>
        
        <div className="love-quote-section">
          <h3>💕 今日情话</h3>
          <div className="quote-display">
            <p className="love-quote">"{loveQuotes[selectedLoveQuote]}"</p>
            <button className="change-quote-btn" onClick={handleQuoteChange}>
              💫 换一句
            </button>
          </div>
        </div>
        
        <div className="custom-message-section">
          <h3>✍️ 专属留言</h3>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="message-textarea"
            placeholder="写下你想说的话..."
            rows="4"
          />
        </div>
        
        <div className="confession-display">
          <div className="confession-card">
            <h4>{customName}:</h4>
            <p className="main-quote">"{loveQuotes[selectedLoveQuote]}"</p>
            {customMessage && (
              <div className="custom-part">
                <p>{customMessage}</p>
              </div>
            )}
            <div className="signature">
              <span>💕 永远爱你的人</span>
              <div className="date">{new Date().toLocaleDateString('zh-CN')}</div>
            </div>
          </div>
        </div>
        
        <div className="emoji-decoration">
          <span>🌹</span>
          <span>💖</span>
          <span>🌹</span>
        </div>
        
        <button className="next-button" onClick={onNext}>
          查看我们的回忆 📸
        </button>
      </div>
    </div>
  )
}

export default Confession