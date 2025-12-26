export interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  lastSeen: string
  isGroup?: boolean
}

export interface Message {
  id: string
  text: string
  sender: "me" | "contact"
  timestamp: string
  status: "sent" | "delivered" | "read"
}

export interface ChatState {
  contacts: Contact[]
  selectedContact: Contact | null
  messages: { [contactId: string]: Message[] }
}
