import { UserService } from "~/services/user/index.service";
import { useUserDS } from "~/dataStore";

import type { TResponseServer, TUser } from "~/types/user";
import type { ControllerResponse } from "~/types/common";

const INTERNAL_TYPES = ['admin', 'internal'] as const


class UserController {
  private readonly userService = new UserService();
  private readonly userDS = useUserDS();

  private handleResponse(response: TResponseServer): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  private setApiFlag(userType: string): void {
    const flag = INTERNAL_TYPES.includes(userType as any)
      ? "admin"
      : "customer";
    localStorage.setItem("apiFlag", flag);
  }

  public async getPorfile(): Promise<ControllerResponse> {
    const cached: TUser | any = this.userService.readCachedData();
    if (cached) this.userDS.setUser(cached);

    const response = await this.userService.getPorfile();

    this.setApiFlag(response.data.userType)

    if (response.success) {
      this.userDS.setUser(response.data);
    }
    return this.handleResponse(response);
  }
}

export const userController = new UserController();
