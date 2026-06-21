export interface TicketReplyResponse {
  success: boolean
  message: string
  data: TicketMessage
}

export interface TicketMessage {
  id: number
  ticketId: number
  senderId: number
  senderType: string
  body: string
  isInternalNote: boolean
  createdAt: string
  updatedAt: string
  sender: TicketSender
  attachments: unknown[]
}

export interface TicketSender {
  id: number
  fullName: string
  mobile: string
  email: string
  userType: string
  isActive: number
  lastLoginAt: string
  createdAt: string
  updatedAt: string
}