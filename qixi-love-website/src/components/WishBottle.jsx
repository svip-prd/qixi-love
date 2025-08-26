import { useState } from 'react'
import './WishBottle.css'

function WishBottle({ onNext }) {
  const [wish, setWish] = useState('')
  const [savedWishes, setSavedWishes] = useState([
    {
      id: 1,
      text: "希望我们的爱情像星星一样永恒闪亮",
      date: "2024-08-26",
      category: "爱情"
    },
    {
      id: 2,
      text: "愿我们一起环游世界，看遍美丽风景",
      date: "2024-08-20",
      category: "旅行"
    },
    {
      id: 3,
      text: "希望我们都能健康快乐，陪伴彼此到老",
      date: "2024-08-15",
      category: "健康"
    }
  ])
  const [selectedCategory, setSelectedCategory] = useState('爱情')
  const [showWishes, setShowWishes] = useState(false)
  
  const categories = ['爱情', '旅行', '健康', '事业', '家庭', '梦想']
  
  const saveWish = () => {
    if (wish.trim()) {
      const newWish = {
        id: Date.now(),
        text: wish,
        date: new Date().toLocaleDateString('zh-CN'),
        category: selectedCategory
      }
      setSavedWishes([newWish, ...savedWishes])
      setWish('')
      
      // 保存到本地存储
      const existingWishes = JSON.parse(localStorage.getItem('loveWishes') || '[]')
      localStorage.setItem('loveWishes', JSON.stringify([newWish, ...existingWishes]))
    }
  }
  
  const deleteWish = (id) => {
    setSavedWishes(prev => prev.filter(w => w.id !== id))
  }
  
  const getCategoryEmoji = (category) => {
    const emojiMap = {
      '爱情': '💕',
      '旅行': '✈️',
      '健康': '🍀',
      '事业': '🌟',
      '家庭': '🏠',
      '梦想': '🌈'
    }
    return emojiMap[category] || '✨'
  }

  return (
    <div className="wish-bottle-container">
      <div className="star-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>
      
      <div className="wish-content">
        <h2 className="wish-title">
          🌠 许愿瓶
        </h2>
        
        <p className="wish-subtitle">
          在这个浪漫的夜晚，许下我们的心愿
        </p>
        
        <div className="bottle-visual">
          <div className="bottle">
            <div className="bottle-cork"></div>
            <div className="bottle-body">
              <div className="bottle-content">
                {savedWishes.slice(0, 3).map((w, index) => (
                  <div key={w.id} className="mini-wish" style={{animationDelay: `${index * 0.5}s`}}>
                    {getCategoryEmoji(w.category)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="wish-form">
          <div className="category-selector">
            <label>许愿类别:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {getCategoryEmoji(cat)} {cat}
                </option>
              ))}
            </select>
          </div>
          
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="写下你的心愿..."
            className="wish-textarea"
            rows="4"
            maxLength="200"
          />
          
          <div className="char-count">
            {wish.length}/200
          </div>
          
          <button 
            className="save-wish-btn" 
            onClick={saveWish}
            disabled={!wish.trim()}
          >
            💫 投入许愿瓶
          </button>
        </div>
        
        <div className="wish-actions">
          <button 
            className="view-wishes-btn"
            onClick={() => setShowWishes(!showWishes)}
          >
            {showWishes ? '🙈 隐藏心愿' : '👀 查看心愿'}
          </button>
        </div>
        
        {showWishes && (
          <div className="wishes-list">
            <h3>💝 我们的心愿清单</h3>
            <div className="wishes-grid">
              {savedWishes.map(wish => (
                <div key={wish.id} className="wish-card">
                  <div className="wish-header">
                    <span className="wish-category">
                      {getCategoryEmoji(wish.category)} {wish.category}
                    </span>
                    <button 
                      className="delete-wish"
                      onClick={() => deleteWish(wish.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="wish-text">{wish.text}</p>
                  <span className="wish-date">{wish.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="moon-decoration">
          <span className="moon">🌙</span>
        </div>
        
        <button className="next-button" onClick={onNext}>
          给我留言 💌
        </button>
      </div>
    </div>
  )
}

export default WishBottle