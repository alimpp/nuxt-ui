import { BaseStore } from "../../../core/BaseStore";
import { StoreManager } from "../../../core/StoreManager";
import { type Ticket } from "../../../types/tickets";
import { type TicketInfo } from "../../../types/tickets/info";
import { TicketModel } from "./models/Ticket.model";
import { TicketInfoModel } from "./models/TicketInfo.model";

interface TMeta {
  page: number;
  per_page: number;
  total: number;
}

interface ITicketsState {
  tickets: TicketModel[];
  info: TicketInfoModel | null;
  showMailBox: boolean;
  meta: TMeta;
  query: string;
}

export class TicketsDS extends BaseStore<ITicketsState> {
  private static _instance: TicketsDS;

  public static getInstance(): TicketsDS {
    if (!TicketsDS._instance) {
      TicketsDS._instance = new TicketsDS();
    }
    return TicketsDS._instance;
  }

  private constructor() {
    super("tickets", {
      tickets: [],
      info: null,
      showMailBox: false,
      meta: {
        page: 1,
        per_page: 10,
        total: 0,
      },
      query: "",
    });
    StoreManager.register(this);
  }

  get getTickets(): TicketModel[] {
    return this._state.tickets;
  }

  setTickets(list: Ticket[]): void {
    this._state.tickets = list.map((item) => new TicketModel(item));
  }

  get getTicketInfo(): TicketInfoModel | null {
    return this._state.info;
  }

  setTicketInfo(info: TicketInfo, reRender = false): void {
    if (reRender) {
      if (this.getTicketInfo) this.setShowMailBox(false);
    }

    setTimeout(() => {
      this._state.info = new TicketInfoModel(info);
      this.setShowMailBox(true);
    }, 1);
  }

  get getShowMailBox(): boolean {
    return this._state.showMailBox;
  }

  setShowMailBox(flag: boolean): void {
    this._state.showMailBox = flag;
  }

  get getMeta(): TMeta {
    return this._state.meta;
  }

  setMeta(meta: TMeta): void {
    this._state.meta = meta;
  }

  resetMeta(): void {
    this._state.meta = {
      page: 1,
      per_page: 10,
      total: 0,
    };
  }

  get getQuery(): string {
    return this._state.query;
  }

  setQuery(query: string): void {
    this._state.query = query;
  }

  resetTicketInfo(): void {
    this._state.info = null;
    this.setShowMailBox(false);
  }

  reset(): void {
    this._state.tickets = [];
  }
}
