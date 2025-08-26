import { useState } from 'react'
import './Gallery.css'

function Gallery({ onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [memories, setMemories] = useState([
    {
      id: 1,
      image: "💑", // 使用emoji作为占位符
      title: "第一次相遇",
      date: "2023-02-14",
      description: "那天阳光正好，你刚好路过..."
    },
    {
      id: 2,
      image: "🌹",
      title: "第一束花",
      date: "2023-03-15",
      description: "红玫瑰代表我的心意"
    },
    {
      id: 3,
      image: "🎂",
      title: "生日惊喜",
      date: "2023-06-20",
      description: "为你准备的专属生日蛋糕"
    },
    {
      id: 4,
      image: "🏖️",
      title: "海边漫步",
      date: "2023-08-10",
      description: "海风轻抚，与你同行"
    },
    {
      id: 5,
      image: "🎄",
      title: "圣诞之夜",
      date: "2023-12-24",
      description: "雪花飞舞的圣诞夜，只有你我"
    },
    {
      id: 6,
      image: "🎆",
      title: "新年钟声",
      date: "2024-01-01",
      description: "新年的第一个拥抱"
    }
  ])
  
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    description: ''
  })
  
  const addMemory = () => {
    if (newMemory.title && newMemory.date) {
      const memory = {
        id: Date.now(),
        image: "📷", // 默认相机emoji
        title: newMemory.title,
        date: newMemory.date,
        description: newMemory.description
      }
      setMemories([...memories, memory])
      setNewMemory({ title: '', date: '', description: '' })
    }
  }

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <h2 className="gallery-title">
          📸 我们的美好回忆
        </h2>
        
        <div className="timeline">
          {memories.map((memory, index) => (
            <div 
              key={memory.id} 
              className={`memory-item ${index % 2 === 0 ? 'left' : 'right'}`}
              onClick={() => setSelectedPhoto(memory)}
            >
              <div className="memory-card">
                <div className="memory-image">
                  <span className="photo-placeholder">{memory.image}</span>
                </div>
                <div className="memory-info">
                  <h4>{memory.title}</h4>
                  <p className="memory-date">{memory.date}</p>
                  <p className="memory-desc">{memory.description}</p>
                </div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
        
        <div className="add-memory-section">
          <h3>✨ 添加新回忆</h3>
          <div className="add-memory-form">
            <input
              type="text"
              placeholder="回忆标题..."
              value={newMemory.title}
              onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
            />
            <input
              type="date"
              value={newMemory.date}
              onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
            />
            <textarea
              placeholder="描述这个美好时刻..."
              value={newMemory.description}
              onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
              rows="2"
            />
            <button onClick={addMemory} className="add-btn">
              💕 添加回忆
            </button>
          </div>
        </div>
        
        <button className="next-button" onClick={onNext}>
          一起玩游戏 🎮
        </button>
      </div>
      
      {/* 照片详情模态框 */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPhoto(null)}>×</button>
            <div className="modal-image">
              <span className="large-photo">{selectedPhoto.image}</span>
            </div>
            <h3>{selectedPhoto.title}</h3>
            <p className="modal-date">{selectedPhoto.date}</p>
            <p className="modal-description">{selectedPhoto.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery