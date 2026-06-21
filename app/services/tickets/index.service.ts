import { BaseApp } from "~/core/BaseApp";
import {
  type TPayloadTicket,
  type GetTicketsResponse,
  type CreateTicketResponse,
} from "~/types/tickets/index";
import { type TicketInfoResponseServer } from "../../types/tickets/info";
import { type TicketReplyResponse } from "../../types/tickets/replay";

export class TicketsService extends BaseApp<any> {
  constructor() {
    super("tickets");
  }

  private get apiFlag(): string {
    return localStorage.getItem("apiFlag") ?? "customer";
  }

  public readCachedData() {
    const cachedData = this.getList();
    if (cachedData) return cachedData;
  }

  public async addTickets(
    payload: TPayloadTicket,
  ): Promise<CreateTicketResponse> {
    try {
      return await this.Post<CreateTicketResponse>(
        `/${this.apiFlag}/tickets`,
        payload,
      );
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async getTickets(
    page: number = 1,
    per_page: number = 10,
    query: string = "",
  ): Promise<GetTicketsResponse> {
    try {
      const serverResponse: GetTicketsResponse = await this.Get(
        `/${this.apiFlag}/tickets?page=${page}&per_page=${per_page}&${query}`,
      );
      this.saveList(serverResponse.data.data);
      return serverResponse;
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async getTicketInfo(
    id: number | string,
  ): Promise<TicketInfoResponseServer> {
    try {
      return await this.Get(`/${this.apiFlag}/tickets/${id}`);
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async replayickets(
    id: number | string,
    message: string,
  ): Promise<TicketReplyResponse> {
    try {
      return await this.Post<TicketReplyResponse>(
        `/${this.apiFlag}/tickets/${id}/replies`,
        { body: message },
      );
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }
}
