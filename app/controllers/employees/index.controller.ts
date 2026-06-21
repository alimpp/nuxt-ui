import { useEmployeesDS } from "../../dataStore/index";
import { EmployessService } from "~/services/employees/index.service";
import type { ControllerResponse } from "~/types/common";
import type {
  TAddInternalUserPayload,
  TServerResponse,
} from "~/types/employees";

class EmployeesController {
  private readonly employeeStore = useEmployeesDS();
  private readonly employessService = new EmployessService();

  private handleResponse(
    response: TServerResponse<unknown>,
  ): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  public async getEmployess(
    page: number = 1,
    per_page: number = 10,
    search: string = "",
  ): Promise<ControllerResponse> {
    this.employeeStore.setLoading(true);
    
    const data = this.employessService.readCachedData();
    if (data) this.employeeStore.setEmployees(data);

    const response = await this.employessService.getEmployess(
      page,
      per_page,
      search,
    );
    if (response.success) {
      this.employeeStore.setEmployees(response.data ? response.data.data : []);
    }
    this.employeeStore.setMeta({
      page: response.data?.meta ? response.data?.meta.currentPage : 1,
      per_page: response.data?.meta ? response.data?.meta.perPage : 10,
      total: response.data?.meta ? response.data?.meta.total : 0,
    });
    this.employeeStore.setLoading(false);
    return this.handleResponse(response);
  }

  public async addEmployee( 
    payload: TAddInternalUserPayload,
  ): Promise<ControllerResponse> {
    const response = await this.employessService.addInternalUser(payload);
    if (response.success) await this.getEmployess();
    return this.handleResponse(response);
  }
}

export const employeesController = new EmployeesController();
