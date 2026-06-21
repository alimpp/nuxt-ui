import { BaseApp } from "~/core/BaseApp";
import type {
  GetEmployessResponse,
  TAddInternalUserPayload,
  TAddInternalUserResponse,
} from "~/types/employees";

export class EmployessService extends BaseApp<any> {
  constructor() {
    super("employess");
  }

  public readCachedData() {
    const cachedData = this.getList();
    if (cachedData) return cachedData;
  }

  public async getEmployess(
    page: number,
    per_page: number,
    search: string,
  ): Promise<GetEmployessResponse> {
    try {
      const serverResponse: GetEmployessResponse = await this.Get(
        `/admin/internal-users?page=${page}&per_page=${per_page}&search=${search}`,
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

  public async addInternalUser(
    payload: TAddInternalUserPayload,
  ): Promise<TAddInternalUserResponse> {
    try {
      return await this.Post<TAddInternalUserResponse>(
        "/admin/internal-users",
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
