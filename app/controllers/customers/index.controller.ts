import { useCustomersDS } from "../../dataStore/index";
import { CustomersService } from "~/services/customers/index.service";
import type { ControllerResponse } from "~/types/common";
import type {
  TAddCustomerPayload,
  TServerResponse,
} from "~/types/customers/index";

class CustomersController {
  private readonly customersStore = useCustomersDS();
  private readonly customersService = new CustomersService();

  private handleResponse(
    response: TServerResponse<unknown>,
  ): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  public async getCustomers(
    page: number = 1,
    per_page: number = 10,
    search: string = "",
  ): Promise<ControllerResponse> {
    this.customersStore.setLoading(true);

    const data = this.customersService.readCachedData();
    if (data) this.customersStore.setCustomers(data);

    const response = await this.customersService.getCustomers(
      page,
      per_page,
      search,
    );
    if (response.success) {
      this.customersStore.setCustomers(response.data ? response.data.data : []);
    }
    this.customersStore.setMeta({
      page: response.data?.meta?.currentPage ?? 1,
      per_page: response.data?.meta?.perPage ?? 10,
      total: response.data?.meta?.total ?? 0,
    });
    this.customersStore.setLoading(false);
    return this.handleResponse(response);
  }

  public async addCustomers(
    payload: TAddCustomerPayload,
  ): Promise<ControllerResponse> {
    const response = await this.customersService.addCustomers(payload);
    if (response.success) await this.getCustomers();
    return this.handleResponse(response);
  }
}

export const customersController = new CustomersController();
