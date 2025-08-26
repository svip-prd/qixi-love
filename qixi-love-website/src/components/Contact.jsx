import { useState } from 'react'
import './Contact.css'

function Contact({ onBack }) {
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "小甜心",
      content: "谢谢你为我做的这个网站，太浪漫了！💕",
      timestamp: "2024-08-26 10:30",
      isReply: false
    },
    {
      id: 2,
      sender: "我",
      content: "只要你开心，我做什么都值得 ❤️",
      timestamp: "2024-08-26 10:35",
      isReply: true
    }
  ])
  const [showShareModal, setShowShareModal] = useState(false)
  
  const sendMessage = () => {
    if (message.trim() && senderName.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: senderName,
        content: message,
        timestamp: new Date().toLocaleString('zh-CN'),
        isReply: false
      }
      setMessages([...messages, newMessage])
      setMessage('')
      
      // 保存到本地存储
      const existingMessages = JSON.parse(localStorage.getItem('loveMessages') || '[]')
      localStorage.setItem('loveMessages', JSON.stringify([...existingMessages, newMessage]))
    }
  }
  
  const generateShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert('链接已复制到剪贴板！💕')
    })
  }
  
  const shareToSocial = (platform) => {
    const url = window.location.href
    const text = "我为你制作了一个特别的七夕网站，快来看看吧！💕"
    
    switch (platform) {
      case 'wechat':
        // 微信分享（实际需要微信SDK）
        alert('请复制链接手动分享到微信 💕')
        generateShareLink()
        break
      case 'qq':
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`)
        break
      case 'weibo':
        window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`)
        break
      default:
        generateShareLink()
    }
  }

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">
          💌 给我留言
        </h2>
        
        <p className="contact-subtitle">
          说出你心中的话，让爱意传递 💕
        </p>
        
        {/* 留言区 */}
        <div className="message-section">
          <h3>💝 我们的对话</h3>
          
          <div className="messages-container">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.isReply ? 'reply' : 'sent'}`}>
                <div className="message-header">
                  <span className="sender">{msg.sender}</span>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
                <div className="message-content">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="message-form">
            <input
              type="text"
              placeholder="你的昵称..."
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="sender-input"
            />
            <textarea
              placeholder="写下你想说的话..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
              rows="3"
            />
            <button 
              className="send-btn"
              onClick={sendMessage}
              disabled={!message.trim() || !senderName.trim()}
            >
              💕 发送留言
            </button>
          </div>
        </div>
        
        {/* 分享区 */}
        <div className="share-section">
          <h3>🔗 分享我们的爱</h3>
          <p>把这份爱意分享给更多人吧！</p>
          
          <div className="share-buttons">
            <button 
              className="share-btn wechat"
              onClick={() => shareToSocial('wechat')}
            >
              💬 微信
            </button>
            <button 
              className="share-btn qq"
              onClick={() => shareToSocial('qq')}
            >
              🐧 QQ
            </button>
            <button 
              className="share-btn weibo"
              onClick={() => shareToSocial('weibo')}
            >
              📢 微博
            </button>
            <button 
              className="share-btn copy"
              onClick={generateShareLink}
            >
              📋 复制链接
            </button>
          </div>
        </div>
        
        {/* 联系信息 */}
        <div className="contact-info">
          <h3>📞 联系方式</h3>
          <div className="contact-items">
            <div className="contact-item">
              <span className="icon">💕</span>
              <span>永远爱你的人</span>
            </div>
            <div className="contact-item">
              <span className="icon">📧</span>
              <span>love@ourwebsite.com</span>
            </div>
            <div className="contact-item">
              <span className="icon">🏠</span>
              <span>我们共同的小窝</span>
            </div>
          </div>
        </div>
        
        {/* 网站信息 */}
        <div className="website-info">
          <p>💖 制作于 {new Date().getFullYear()} 年七夕节</p>
          <p>🌟 用代码编织的爱情故事</p>
          <p>💫 愿我们的爱情永远闪亮</p>
        </div>
        
        <div className="footer-decoration">
          <span>🌹</span>
          <span>💖</span>
          <span>🌹</span>
          <span>💝</span>
          <span>🌹</span>
        </div>
        
        <button className="back-button" onClick={onBack}>
          🏠 回到首页
        </button>
      </div>
      
      {/* 分享模态框 */}
      {showShareModal && (
        <div className="share-modal" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>分享我们的爱 💕</h3>
            <p>选择分享方式:</p>
            <div className="share-options">
              {/* 分享选项 */}
            </div>
            <button onClick={() => setShowShareModal(false)}>关闭</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact