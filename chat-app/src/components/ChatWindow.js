"use client"

import { useState, useRef, useEffect } from "react"

const mockMessages = [
  {
    id: "1",
    text: "Hey! How are you doing?",
    sender: "contact",
    timestamp: "2:25 PM",
    status: "read",
  },
  {
    id: "2",
    text: "I'm doing great! Just finished work. How about you?",
    sender: "me",
    timestamp: "2:26 PM",
    status: "read",
  },
  {
    id: "3",
    text: "Same here! Want to grab dinner tonight?",
    sender: "contact",
    timestamp: "2:27 PM",
    status: "read",
  },
  {
    id: "4",
    text: "That sounds perfect! What time works for you?",
    sender: "me",
    timestamp: "2:28 PM",
    status: "delivered",
  },
  {
    id: "5",
    text: "How about 7 PM at that new Italian place?",
    sender: "contact",
    timestamp: "2:30 PM",
    status: "sent",
  },
]

const StatusIcon = ({ status }) => {
  switch (status) {
    case "sent":
      return (
        <svg className="message-status" viewBox="0 0 16 15" fill="currentColor">
          <path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.85 4.85 5.437 1.437a.365.365 0 0 0-.516 0l-.478.372a.365.365 0 0 0 0 .516L7.367 5.25l-2.925 2.925a.365.365 0 0 0 0 .516l.478.372a.365.365 0 0 0 .516 0L8.85 6.15l3.413 3.413a.365.365 0 0 0 .516 0l.478-.372a.365.365 0 0 0 0-.516L10.333 5.75l2.925-2.925a.365.365 0 0 0 0-.516z" />
        </svg>
      )
    case "delivered":
      return (
        <svg className="message-status" viewBox="0 0 16 15" fill="currentColor">
          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.85 9.85 5.437 6.437a.365.365 0 0 0-.516 0l-.478.372a.365.365 0 0 0 0 .516L8.367 11.25l8.925-8.925a.365.365 0 0 0 0-.516z" />
          <path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.85 4.85 5.437 1.437a.365.365 0 0 0-.516 0l-.478.372a.365.365 0 0 0 0 .516L7.367 5.25l-2.925 2.925a.365.365 0 0 0 0 .516l.478.372a.365.365 0 0 0 .516 0L8.85 6.15l3.413 3.413a.365.365 0 0 0 .516 0l.478-.372a.365.365 0 0 0 0-.516L10.333 5.75l2.925-2.925a.365.365 0 0 0 0-.516z" />
        </svg>
      )
    case "read":
      return (
        <svg className="message-status" viewBox="0 0 16 15" fill="#3b82f6">
          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.85 9.85 5.437 6.437a.365.365 0 0 0-.516 0l-.478.372a.365.365 0 0 0 0 .516L8.367 11.25l8.925-8.925a.365.365 0 0 0 0-.516z" />
          <path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.85 4.85 5.437 1.437a.365.365 0 0 0-.516 0l-.478.372a.365.365 0 0 0 0 .516L7.367 5.25l-2.925 2.925a.365.365 0 0 0 0 .516l.478.372a.365.365 0 0 0 .516 0L8.85 6.15l3.413 3.413a.365.365 0 0 0 .516 0l.478-.372a.365.365 0 0 0 0-.516L10.333 5.75l2.925-2.925a.365.365 0 0 0 0-.516z" />
        </svg>
      )
    default:
      return null
  }
}

const ChatWindow = ({ contact, onBack }) => {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <button className="back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="contact-avatar" />
          <div className="chat-contact-info">
            <h2>{contact.name}</h2>
            <p>{contact.lastSeen}</p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.sender === "me" ? "sent" : "received"}`}>
            <div className={`message-bubble ${message.sender === "me" ? "sent" : "received"}`}>
              <p className="message-text">{message.text}</p>
              <div className={`message-footer ${message.sender === "me" ? "sent" : "received"}`}>
                <span className="message-time">{message.timestamp}</span>
                {message.sender === "me" && <StatusIcon status={message.status} />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <div className="input-actions">
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="15.5" cy="9.5" r="1.5" />
              <circle cx="8.5" cy="9.5" r="1.5" />
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z" />
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
            </svg>
          </button>
        </div>
        <div className="message-input-wrapper">
          <input
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
          />
          {newMessage.trim() ? (
            <button className="send-button" onClick={sendMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          ) : (
            <button className="mic-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
