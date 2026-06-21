export interface TicketInfoResponseServer {
  success: boolean
  message: string
  data: TicketInfo
}

export interface TicketCustomer {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  userType: string;
  isActive: 0 | 1;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketInfo {
  id: number
  trackingCode: string
  title: string
  customerId: number
  departmentId: number
  priorityId: number
  statusId: number
  assignedToId: number | null
  closedById: number | null
  lastMessageAt: string
  closedAt: string | null
  createdAt: string
  updatedAt: string
  department: TicketDepartment
  priority: TicketPriority
  status: TicketStatus
  assignedTo: TicketUser | null
  messages: TicketMessage[]
  itsMe: boolean,
  customer: TicketCustomer | null;
}

export interface TicketDepartment {
  id: number
  name: string
  description: string
  slug: string
  isActive: 0 | 1
  createdAt: string
  updatedAt: string
}

export interface TicketPriority {
  id: number
  title: string
  slug: string
  level: number
  isActive: 0 | 1
  createdAt: string
  updatedAt: string
}

export interface TicketStatus {
  id: number
  title: string
  slug: string
  isActive: 0 | 1
  isFinal: 0 | 1
  createdAt: string
  updatedAt: string
}

export interface TicketMessage {
  id: number
  ticketId: number
  senderId: number
  senderType: UserType
  body: string
  isInternalNote: 0 | 1
  createdAt: string
  updatedAt: string
  sender: TicketUser
  attachments: TicketAttachment[]
}

export interface TicketUser {
  id: number
  fullName: string
  mobile: string
  email: string
  userType: UserType
  isActive: 0 | 1
  lastLoginAt: string
  createdAt: string
  updatedAt: string
}

export interface TicketAttachment {
  [key: string]: unknown
}

export type UserType = 'customer' | 'admin' | 'agent'