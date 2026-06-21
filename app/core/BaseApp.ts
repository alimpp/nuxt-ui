import { useCustomFetch } from "../composables/useCustomFetch";
import { toast } from "vue3-toastify";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export abstract class BaseApp<T extends { id: string | number }> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    body?: any,
    query?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    const api = useCustomFetch();

    const isFormData = body instanceof FormData;

    try {
      const response = await api(url, {
        method,
        query,
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...headers,
        },
      });

      return response as T;
    } catch (err) {
      throw err;
    }
  }

  public async Get<T>(url: string, query?: Record<string, any>): Promise<T> {
    return this.request<T>(url, "GET", undefined, query);
  }

  public async Post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "POST", body);
  }

  public async Patch<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PATCH", body);
  }

  public async Put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PUT", body);
  }

  public async Delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }

  public async Upload<T>(url: string, body: FormData): Promise<T> {
    const api = useCustomFetch();
    try {
      const response = await api(url, {
        method: "POST",
        body,
      });
      return response as T;
    } catch (err) {
      throw err;
    }
  }

  protected getList(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as T[]) : [];
  }

  protected saveList(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  protected getObject() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  protected saveObject(item: T): void {
    localStorage.setItem(this.storageKey, JSON.stringify(item));
  }

  protected remove() {
    localStorage.removeItem(this.storageKey);
  }
}
