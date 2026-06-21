import type {
  TicketInfo,
  TicketDepartment,
  TicketPriority,
  TicketStatus,
  TicketCustomer
} from "../../../../types/tickets/info";
import { TicketMessageModel, TicketUserModel } from "./TicketMessage.model";

export class TicketCustomerModel {
  readonly id: number;
  readonly fullName: string;
  readonly mobile: string;
  readonly email: string;
  readonly userType: string;
  readonly isActive: boolean;
  readonly lastLoginAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(raw: TicketCustomer) {
    this.id = raw.id;
    this.fullName = raw.fullName;
    this.mobile = raw.mobile;
    this.email = raw.email;
    this.userType = raw.userType;
    this.isActive = raw.isActive === 1;
    this.lastLoginAt = raw.lastLoginAt ?? null;
    this.createdAt = raw.createdAt;
    this.updatedAt = raw.updatedAt;
  }
}

export class TicketDepartmentModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly slug: string;
  readonly isActive: boolean;

  constructor(raw: TicketDepartment) {
    this.id = raw.id;
    this.name = raw.name;
    this.description = raw.description;
    this.slug = raw.slug;
    this.isActive = raw.isActive === 1;
  }
}

export class TicketPriorityModel {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly level: number;
  readonly isActive: boolean;
  readonly chipColor: string;

  private static readonly COLOR_MAP: Record<string, string> = {
    low: "success",
    normal: "warning",
    high: "error",
  };

  constructor(raw: TicketPriority) {
    this.id = raw.id;
    this.title = raw.title;
    this.slug = raw.slug;
    this.level = raw.level;
    this.isActive = raw.isActive === 1;
    this.chipColor = TicketPriorityModel.COLOR_MAP[raw.slug] ?? "neutral";
  }
}

export class TicketStatusModel {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
  readonly chipColor: string;

  private static readonly COLOR_MAP: Record<string, string> = {
    open: "error",
    pending_internal: "secondary",
    closed: "neutral",
  };

  constructor(raw: TicketStatus) {
    this.id = raw.id;
    this.title = raw.title;
    this.slug = raw.slug;
    this.isActive = raw.isActive === 1;
    this.isFinal = raw.isFinal === 1;
    this.chipColor = TicketStatusModel.COLOR_MAP[raw.slug] ?? "neutral";
  }

  get isClosed(): boolean {
    return this.isFinal;
  }
}

export class TicketInfoModel {
  readonly id: number;
  readonly trackingCode: string;
  readonly title: string;
  readonly customerId: number;
  readonly lastMessageAt: string;
  readonly closedAt: string | null;
  readonly createdAt: string;
  readonly itsMe: boolean;
  readonly department: TicketDepartmentModel;
  readonly priority: TicketPriorityModel;
  readonly status: TicketStatusModel;
  readonly assignedTo: TicketUserModel | null;
  readonly messages: TicketMessageModel[];
  readonly customer: TicketCustomerModel | null;

  constructor(raw: TicketInfo) {
    this.id = raw.id;
    this.trackingCode = raw.trackingCode;
    this.title = raw.title;
    this.customerId = raw.customerId;
    this.lastMessageAt = raw.lastMessageAt;
    this.closedAt = raw.closedAt;
    this.createdAt = this.formatDateTime(raw.createdAt);
    this.itsMe = raw.itsMe;
    this.department = new TicketDepartmentModel(raw.department);
    this.priority = new TicketPriorityModel(raw.priority);
    this.status = new TicketStatusModel(raw.status);
    this.assignedTo = raw.assignedTo ? new TicketUserModel(raw.assignedTo) : null;
    this.messages = raw.messages.map((msg) => new TicketMessageModel(msg));
    this.customer = raw.customer ? new TicketCustomerModel(raw.customer) : null;
  }

  get isOpen(): boolean {
    return !this.status.isClosed;
  }

  get hasAssignee(): boolean {
    return this.assignedTo !== null;
  }

  get lastMessage(): TicketMessageModel | null {
    return this.messages.at(-1) ?? null;
  }

  private formatDateTime(iso: string): string {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(iso));
  }
}