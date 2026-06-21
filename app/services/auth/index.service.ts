import { BaseApp } from "~/core/BaseApp";
import type { TLoginPayload, TVerifyOtpPayload } from "~/types/auth";
import type { TResponseServer } from "~/types/auth";

export class AuthService extends BaseApp<any> {
  constructor() {
    super("auth");
  }

  public async login(payload: TLoginPayload): Promise<TResponseServer> {
    try {
      return await this.Post<TResponseServer>("/auth/login/password", payload);
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.response?._data?.message || "عملیات ورود با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async loginWithPhone(
    payload: number | string,
  ): Promise<TResponseServer> {
    try {
      return await this.Post<TResponseServer>("/auth/login/otp/request", {
        mobile: payload,
      });
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?._data?.message || "ارسال کد با خطا مواجه شد",
        data: null,
      };
    }
  }

  public async verifyOtp(payload: TVerifyOtpPayload): Promise<TResponseServer> {
    try {
      return await this.Post<TResponseServer>(
        "/auth/login/otp/verify",
        payload,
      );
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?._data?.message || "تأیید کد با خطا مواجه شد",
        data: null,
      };
    }
  }
}
