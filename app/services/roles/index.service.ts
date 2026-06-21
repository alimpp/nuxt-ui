import { BaseApp } from '~/core/BaseApp'
import type { GetRolesResponse } from '~/types/roles'

export class RolesService extends BaseApp<any> {
  constructor() {
    super('roles')
  }

  public readCachedData() {
    const cachedData = this.getList()
    if (cachedData) return cachedData
  }

  public async getRoles(): Promise<GetRolesResponse> {
    try {
      const serverResponse: GetRolesResponse = await this.Get('/admin/roles')
      this.saveList(serverResponse.data ?? [])
      return serverResponse
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?._data?.message || 'با خطا مواجه شد',
        data: null,
      }
    }
  }
}