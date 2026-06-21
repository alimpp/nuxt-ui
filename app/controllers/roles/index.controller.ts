import { useRolesDS } from '../../dataStore/index'
import { RolesService } from '~/services/roles/index.service'
import type { ControllerResponse } from '~/types/common'
import type { GetRolesResponse } from '~/types/roles'

class RolesController {
  private readonly rolesStore = useRolesDS()
  private readonly rolesService = new RolesService()

  private handleResponse(response: GetRolesResponse): ControllerResponse {
    return {
      success: !!response.success,
      message: response.message ?? '',
    }
  }

  public async getRoles(): Promise<ControllerResponse> {
    const cached = this.rolesService.readCachedData()
    if (cached) this.rolesStore.setRoles(cached)

    const response = await this.rolesService.getRoles()
    if (response.success) {
      this.rolesStore.setRoles(response.data ?? [])
    }
    return this.handleResponse(response)
  }
}

export const rolesController = new RolesController()