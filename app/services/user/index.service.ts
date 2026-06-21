import { BaseApp } from "~/core/BaseApp";
import type { TResponseServer } from "~/types/user";

export class UserService extends BaseApp<any> {
  constructor() {
    super("user");
  }

  public readCachedData() {
    const cachedData = this.getList();
    if (cachedData) return cachedData;
  }

  public async getPorfile(): Promise<TResponseServer> {
    try {
      const serverResponse = await this.Get<TResponseServer>("/auth/me");
      this.saveObject(serverResponse.data)
      return serverResponse
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?._data?.message || "پروفایل با خطا مواجه شد",
        data: null,
      };
    }
  }
}
