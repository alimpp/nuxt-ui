import type {
  Ticket,
  Department,
  Priority,
  Status,
  Messages,
  TicketSender,
  TicketAttachment,
} from "../../../../types/tickets/index";

const PRIORITY_COLOR_MAP: Record<string, string> = {
  low: "success",
  normal: "warning",
  high: "error",
};

const STATUS_COLOR_MAP: Record<string, string> = {
  open: "error",
  pending_internal: "secondary",
  closed: "neutral",
};

export class DepartmentModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly slug: string;
  readonly isActive: boolean;

  constructor(raw: Department) {
    this.id = raw.id;
    this.name = raw.name;
    this.description = raw.description;
    this.slug = raw.slug;
    this.isActive = raw.isActive === 1;
  }
}

export class PriorityModel {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly level: number;
  readonly isActive: boolean;
  readonly chipColor: string;

  constructor(raw: Priority) {
    this.id = raw.id;
    this.title = raw.title;
    this.slug = raw.slug;
    this.level = raw.level;
    this.isActive = raw.isActive === 1;
    this.chipColor = PRIORITY_COLOR_MAP[raw.slug] ?? "neutral";
  }

  get isHigh(): boolean {
    return this.slug === "high";
  }
}

export class StatusModel {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
  readonly chipColor: string;

  constructor(raw: Status) {
    this.id = raw.id;
    this.title = raw.title;
    this.slug = raw.slug;
    this.isActive = raw.isActive === 1;
    this.isFinal = raw.isFinal === 1;
    this.chipColor = STATUS_COLOR_MAP[raw.slug] ?? "neutral";
  }

  get isClosed(): boolean {
    return this.isFinal;
  }
}

export class TicketSenderModel {
  readonly id: number;
  readonly fullName: string;
  readonly email: string;
  readonly mobile: string;
  readonly userType: string;
  readonly isActive: boolean;
  readonly lastLoginAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly avatar: string;

  constructor(raw: TicketSender) {
    this.id = raw.id;
    this.fullName = raw.fullName;
    this.email = raw.email;
    this.mobile = raw.mobile;
    this.userType = raw.userType;
    this.isActive = raw.isActive === 1;
    this.lastLoginAt = raw.lastLoginAt ?? null;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
    this.avatar = raw.fullName[0]?.toUpperCase() ?? "?";
  }

  get isAdmin(): boolean {
    return this.userType === "admin";
  }

  get isAgent(): boolean {
    return this.userType === "agent";
  }

  get isCustomer(): boolean {
    return this.userType === "customer";
  }
}

export class AttachmentModel {
  readonly id: number;
  readonly fileName: string;
  readonly fileUrl: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly createdAt: string;

  constructor(raw: TicketAttachment) {
    this.id = raw.id;
    this.fileName = raw.fileName;
    this.fileUrl = raw.fileUrl;
    this.fileSize = raw.fileSize;
    this.mimeType = raw.mimeType;
    this.createdAt = raw.createdAt;
  }

  get isImage(): boolean {
    return this.mimeType.startsWith("image/");
  }

  get formattedSize(): string {
    if (this.fileSize < 1024) return `${this.fileSize} B`;
    if (this.fileSize < 1024 * 1024)
      return `${(this.fileSize / 1024).toFixed(1)} KB`;
    return `${(this.fileSize / (1024 * 1024)).toFixed(1)} MB`;
  }
}

export class TicketMessageModel {
  readonly id: number;
  readonly ticketId: number;
  readonly senderId: number;
  readonly senderType: string;
  readonly body: string;
  readonly isInternalNote: boolean;
  readonly createdAt: string;
  readonly sender: TicketSenderModel;
  readonly attachments: AttachmentModel[];

  constructor(raw: Messages) {
    this.id = raw.id;
    this.ticketId = raw.ticketId;
    this.senderId = raw.senderId;
    this.senderType = raw.senderType;
    this.body = raw.body;
    this.isInternalNote = raw.isInternalNote === 1;
    this.createdAt = this.formatTime(raw.createdAt);
    this.sender = new TicketSenderModel(raw.sender);
    this.attachments = raw.attachments.map((a) => new AttachmentModel(a));
  }

  get plainText(): string {
    return this.body.replace(/<[^>]*>/g, "");
  }

  get hasAttachments(): boolean {
    return this.attachments.length > 0;
  }

  private formatTime(iso: string): string {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(iso));
  }
}

export class TicketModel {
  readonly id: number;
  readonly trackingCode: string;
  readonly title: string;
  readonly customerId: number;
  readonly assignedToId: number | null;
  readonly closedById: number | null;
  readonly lastMessageAt: string;
  readonly closedAt: string | null;
  readonly createdAt: string;
  readonly department: DepartmentModel;
  readonly priority: PriorityModel;
  readonly status: StatusModel;
  readonly assignedTo: { id: number; [key: string]: unknown } | null;
  readonly customer: TicketSenderModel | null;
  readonly messages: TicketMessageModel[];

  constructor(raw: Ticket) {  
    this.id = raw.id;
    this.trackingCode = raw.trackingCode;
    this.title = raw.title;
    this.customerId = raw.customerId;
    this.assignedToId = raw.assignedToId;
    this.closedById = raw.closedById;
    this.lastMessageAt = raw.lastMessageAt;
    this.closedAt = raw.closedAt;
    this.createdAt = this.formatDate(raw.createdAt);
    this.department = new DepartmentModel(raw.department);
    this.priority = new PriorityModel(raw.priority);
    this.status = new StatusModel(raw.status);
    this.assignedTo = raw.assignedTo;
    this.customer = raw.customer ? new TicketSenderModel(raw.customer) : null;
    this.messages = raw.messages?.map((m) => new TicketMessageModel(m)) ?? [];
  }

  get isOpen(): boolean {
    return !this.status.isClosed;
  }

  get isAssigned(): boolean {
    return this.assignedToId !== null;
  }

  get isUrgent(): boolean {
    return this.priority.isHigh;
  }

  get lastMessage(): TicketMessageModel | null {
    return this.messages.at(-1) ?? null;
  }

  private formatDate(iso: string): string {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  }
}
