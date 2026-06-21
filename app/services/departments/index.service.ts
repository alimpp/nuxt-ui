import { BaseApp } from "~/core/BaseApp";
import { type GetDepartmentsResponse } from "../../types/departments/index";

export class DepartmentsService extends BaseApp<any> {
  constructor() {
    super("departments");
  }

  public readCachedData() {
    const cachedData = this.getList();
    if (cachedData) return cachedData;
  }

  public async getDepartments(): Promise<GetDepartmentsResponse> {
    try {
      const serverResponse: GetDepartmentsResponse =
        await this.Get(`/departments`);
      this.saveList(serverResponse.data);
      return serverResponse;
    } catch (error) {
      return {
        success: false,
        message: error?.response?._data?.message || "با خطا مواجه شد",
        data: null,
      };
    }
  }
}
