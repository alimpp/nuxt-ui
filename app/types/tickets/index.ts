export interface TPayloadTicket {
  title: string;
  department_id: number;
  priority_id: number;
  body: string;
}

export interface GetTicketsResponse {
  success: boolean;
  message: string;
  data: TicketsPagination;
}

export interface TicketsPagination {
  meta: Meta;
  data: Ticket[];
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface Ticket {
  id: number;
  trackingCode: string;
  title: string;
  customerId: number;
  departmentId: number;
  priorityId: number;
  statusId: number;
  assignedToId: number | null;
  closedById: number | null;
  lastMessageAt: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  department: Department;
  assignedTo: User | null;
  priority: Priority;
  status: Status;
  messages?: Messages[]
  customer?: TicketSender
}

export interface Department {
  id: number;
  name: string;
  description: string;
  slug: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface Priority {
  id: number;
  title: string;
  slug: string;
  level: number;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  chipColor?: string;
}

export interface Status {
  id: number;
  title: string;
  slug: string;
  isActive: number;
  isFinal: number;
  createdAt: string;
  updatedAt: string;
  chipColor: string;
}

export interface User {
  id: number;
  [key: string]: unknown;
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  data: TicketDetails;
}

export interface TicketDetails {
  id: number;
  trackingCode: string;
  title: string;
  customerId: number;
  departmentId: number;
  priorityId: number;
  statusId: number;

  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;

  department: Department;
  priority: Priority;
  status: Status;
  messages: TicketMessage[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
  slug: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: number;
  ticketId: number;
  senderId: number;
  senderType: "customer" | "admin" | "agent";
  body: string;
  isInternalNote: number;
  createdAt: string;
  updatedAt: string;

  sender: Sender;
  attachments: Attachment[];
}

export interface Sender {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  userType: "customer" | "admin" | "agent";
  isActive: number;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id?: number;
  fileName?: string;
  fileUrl?: string;
  mimeType?: string;
  size?: number;
}


export interface Messages {
  id: number
  ticketId: number
  senderId: number
  senderType: SenderType
  body: string
  isInternalNote: number
  createdAt: string
  updatedAt: string
  sender: TicketSender
  attachments: TicketAttachment[]
}

export interface TicketSender {
  id: number
  fullName: string
  mobile: string
  email: string
  userType: UserType
  isActive: number
  lastLoginAt: string
  createdAt: string
  updatedAt: string
}

export interface TicketAttachment {
  id: number
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
  createdAt: string
}

export type SenderType = 'customer' | 'admin' | 'agent'

export type UserType = 'customer' | 'admin' | 'agent'