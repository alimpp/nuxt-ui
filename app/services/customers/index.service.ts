import { BaseApp } from "~/core/BaseApp";
import type {
  GetCustomersResponse,
  TAddCustomerPayload,
  TAddCustomerResponse,
} from "~/types/customers/index";

export class CustomersService extends BaseApp<any> {
  constructor() {
    super("customers");
  }

  public readCachedData() {
    const cachedData = this.getList();
    if (cachedData) return cachedData;
  }

  public async getCustomers(
    page: number,
    per_page: number,
    search: string,
  ): Promise<GetCustomersResponse> {
    try {
      const serverResponse: GetCustomersResponse = await this.Get(
        `/admin/customers?page=${page}&per_page=${per_page}&search=${search}`,
      );
      this.saveList(serverResponse.data ? serverResponse.data?.data : []);
      return serverResponse;
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async addCustomers(
    payload: TAddCustomerPayload,
  ): Promise<TAddCustomerResponse> {
    try {
      return await this.Post<TAddCustomerResponse>(
        "/admin/customers",
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
}
