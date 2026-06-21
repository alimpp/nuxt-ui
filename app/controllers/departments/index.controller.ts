import { DepartmentsService } from "~/services/departments/index.service";
import type { ControllerResponse } from "~/types/common";
import type { GetDepartmentsResponse } from "~/types/departments";

import { useDepartmentsDS } from "~/dataStore/index";

class DepartmentsController {
  private readonly departmentsService = new DepartmentsService();
  private readonly departmentsStore = useDepartmentsDS();

  private handleResponse(response: GetDepartmentsResponse): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  public async getDepartments(): Promise<ControllerResponse> {
    const data = this.departmentsService.readCachedData();
    if (data) this.departmentsStore.setDepartments(data);
    
    const response = await this.departmentsService.getDepartments();
    if (response.success) {
      this.departmentsStore.setDepartments(response.data)
    }
    return this.handleResponse(response);
  }
}

export const departmentsController = new DepartmentsController();
