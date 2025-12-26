 "use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"

const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
    isOnline: true,
    lastSeen: "online",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Thanks for the help yesterday!",
    lastMessageTime: "1:45 PM",
    unreadCount: 0,
    isOnline: false,
    lastSeen: "last seen 1 hour ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Let's meet tomorrow at 3 PM",
    lastMessageTime: "12:20 PM",
    unreadCount: 1,
    isOnline: false,
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "4",
    name: "Family Group",
    avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=40&h=40&fit=crop&crop=face",
    lastMessage: "Mom: Don't forget dinner tonight!",
    lastMessageTime: "11:30 AM",
    unreadCount: 5,
    isOnline: false,
    lastSeen: "",
    isGroup: true,
  },
  {
    id: "5",
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    lastMessage: "😂😂😂 That's hilarious!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: true,
    lastSeen: "online",
  },
]

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

// Status Icon Component
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

// Chat List Component
const ChatList = ({ contacts, selectedContact, onSelectContact }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="chat-list">
      {/* Header */}
      <div className="chat-list-header">
        <div className="chat-list-user">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
            alt="Me"
            className="contact-avatar"
          />
          <h1 className="chat-list-title">Chats</h1>
        </div>
        <div className="chat-list-actions">
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h15v11z" />
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </button>
          <button className="action-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            className="search-input"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Unread</button>
        <button className="filter-tab">Groups</button>
      </div>

      {/* Chat List */}
      <div className="contacts-list">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`contact-item ${selectedContact?.id === contact.id ? "selected" : ""}`}
          >
            <div className="contact-avatar-wrapper">
              <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="contact-avatar" />
              {contact.isOnline && <div className="online-indicator"></div>}
            </div>

            <div className="contact-info">
              <div className="contact-header">
                <h3 className="contact-name">{contact.name}</h3>
                <span className="contact-time">{contact.lastMessageTime}</span>
              </div>
              <div className="contact-footer">
                <p className="contact-last-message">{contact.lastMessage}</p>
                {contact.unreadCount > 0 && <span className="unread-badge">{contact.unreadCount}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chat Window Component
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
    <div className="chat-window">
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

// Main App Component
function App() {
  const [selectedContact, setSelectedContact] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="whatsapp-container">
      {/* Chat List Sidebar */}
      <div className={`chat-list-container ${selectedContact && isMobile ? "hidden" : ""}`}>
        <ChatList contacts={mockContacts} selectedContact={selectedContact} onSelectContact={setSelectedContact} />
      </div>

      {/* Chat Window */}
      <div className={`chat-window-container ${!selectedContact && isMobile ? "hidden" : ""}`}>
        {selectedContact ? (
          <ChatWindow contact={selectedContact} onBack={() => setSelectedContact(null)} />
        ) : (
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="whatsapp-logo">
                <svg viewBox="0 0 303 172" className="logo-svg">
                  <path
                    fill="#25D366"
                    d="M229.1 0h-76.2c-40.8 0-73.9 33.1-73.9 73.9v24.4c0 40.8 33.1 73.9 73.9 73.9h76.2c40.8 0 73.9-33.1 73.9-73.9V73.9C303 33.1 269.9 0 229.1 0z"
                  />
                </svg>
              </div>
              <h2>WhatsApp Web</h2>
              <p>
                Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and
                1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
