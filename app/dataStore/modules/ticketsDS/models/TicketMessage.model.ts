import type { TicketMessage, TicketUser, UserType } from "../../../../types/tickets/info";

export class TicketUserModel {
  readonly id: number;
  readonly fullName: string;
  readonly email: string;
  readonly mobile: string;
  readonly userType: UserType;
  readonly avatar: string;

  constructor(raw: TicketUser) {
    this.id = raw.id;
    this.fullName = raw.fullName;
    this.email = raw.email;
    this.mobile = raw.mobile;
    this.userType = raw.userType;
    this.avatar = raw.fullName[0]?.toUpperCase() ?? "?";
  }

  get isAdmin(): boolean { return this.userType === "admin"; }
  get isAgent(): boolean { return this.userType === "agent"; }
  get isCustomer(): boolean { return this.userType === "customer"; }
}

export type MessageContentType = "html" | "plain" | "mixed";

export class TicketMessageModel {
  readonly id: number;
  readonly ticketId: number;
  readonly senderId: number;
  readonly senderType: UserType;
  readonly body: string;
  readonly isInternalNote: boolean;
  readonly createdAt: string;
  readonly sender: TicketUserModel;

  constructor(raw: TicketMessage) {
    this.id = raw.id;
    this.ticketId = raw.ticketId;
    this.senderId = raw.senderId;
    this.senderType = raw.senderType;
    this.body = raw.body;
    this.isInternalNote = raw.isInternalNote === 1;
    this.createdAt = this.formatTime(raw.createdAt);
    this.sender = new TicketUserModel(raw.sender);
  }

  get plainText(): string {
    return this.body.replace(/<[^>]*>/g, "").trim();
  }

  get isHtml(): boolean {
    return /<[a-z][\s\S]*>/i.test(this.body);
  }

  get isPlainUrl(): boolean {
    if (this.isHtml) return false;
    return this.URL_REGEX.test(this.body.trim());
  }

  get urls(): string[] {
    const plain = this.plainText;
    const matches = plain.match(this.URL_REGEX);
    return matches ?? [];
  }

  get hasUrl(): boolean {
    return this.urls.length > 0;
  }

  get contentType(): MessageContentType {
    if (this.isHtml && this.hasUrl) return "mixed";
    if (this.isHtml) return "html";
    return "plain";
  }

  get renderedBody(): string {
    if (this.isHtml) return this.body;
    return this.body.replace(
      this.URL_REGEX,
      (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${url}</a>`
    );
  }

  private get URL_REGEX(): RegExp {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
  }

  private formatTime(iso: string): string {
    return new Intl.DateTimeFormat("fa-IR", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(iso));
  }
} 