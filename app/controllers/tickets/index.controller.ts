import { TicketsService } from "~/services/tickets/index.service";
import { useTicketsDS } from "../../dataStore/index";

import type { ControllerResponse, ServerResponse } from "~/types/common";
import {
  type TPayloadTicket,
  type GetTicketsResponse,
  type CreateTicketResponse,
} from "~/types/tickets";
import { type TicketInfoResponseServer } from "../../types/tickets/info";
import { type TicketReplyResponse } from "../../types/tickets/replay";

class TicketsController {
  private readonly ticketsService = new TicketsService();
  private readonly ticketsStore = useTicketsDS();

  private handleResponse(response: ServerResponse): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  public async addTicket(payload: TPayloadTicket): Promise<ControllerResponse> {
    const response: CreateTicketResponse =
      await this.ticketsService.addTickets(payload);
    if (response.success) await this.getTickets();
    return this.handleResponse(response);
  }

  public async getTickets(
    page: number = 1,
    per_page: number = 10,
    query: string = "",
  ): Promise<ControllerResponse> {
    const data = this.ticketsService.readCachedData();
    if (data) this.ticketsStore.setTickets(data);

    const response: GetTicketsResponse = await this.ticketsService.getTickets(
      page,
      per_page,
      query,
    );
    if (response.success) {
      this.ticketsStore.setTickets(response.data.data);
    }
    this.ticketsStore.setMeta({
      page: response.data?.meta ? response.data?.meta.currentPage : 1,
      per_page: response.data?.meta ? response.data?.meta.perPage : 10,
      total: response.data?.meta ? response.data?.meta.total : 0,
    });
    return this.handleResponse(response);
  }

  public async getTicketInfo(
    id: number | string,
    reRenderFlag: boolean,
  ): Promise<ControllerResponse> {
    const response: TicketInfoResponseServer =
      await this.ticketsService.getTicketInfo(id);
    if (response.success)
      this.ticketsStore.setTicketInfo(response.data, reRenderFlag);
    return this.handleResponse(response);
  }

  public async replayickets(
    id: string | number,
    message: string,
  ): Promise<ControllerResponse> {
    const response: TicketReplyResponse =
      await this.ticketsService.replayickets(id, message);
    if (response.success) this.getTicketInfo(id, false);
    return this.handleResponse(response);
  }
}

export const ticketsController = new TicketsController();
