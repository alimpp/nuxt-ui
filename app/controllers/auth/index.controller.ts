import { AuthService } from "~/services/auth/index.service";
import { useUserDS } from "~/dataStore";
import { useCookie } from "#app";

import type { TLoginPayload, TVerifyOtpPayload } from "~/types/auth";
import type { TResponseServer } from "~/types/auth";
import type { ControllerResponse } from "~/types/common";

class AuthController {
  private readonly authService = new AuthService();
  private readonly userDS = useUserDS();

  private handleResponse(response: TResponseServer): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? "",
    };
  }

  public async login(payload: TLoginPayload): Promise<ControllerResponse> {
    const response = await this.authService.login(payload);

    if (response.success) {
      const token = useCookie("token");
      token.value = response.data.token.token || "";
      this.userDS.setIsAuth(true);
    }

    return this.handleResponse(response);
  }

  public async loginWithPhone(
    mobile: number | string,
  ): Promise<ControllerResponse> {
    const response = await this.authService.loginWithPhone(mobile);

    return this.handleResponse(response);
  }

  public async verifyOtp(
    payload: TVerifyOtpPayload,
  ): Promise<ControllerResponse> {
    const response = await this.authService.verifyOtp(payload);

    return this.handleResponse(response);
  }
}

export const authController = new AuthController();
