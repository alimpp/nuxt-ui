import type { TRole, Permission } from '~/types/roles'

export class PermissionModel implements Permission {
  id: number
  name: string
  description: string | null
  slug: string
  createdAt: string
  updatedAt: string

  constructor(data: Permission) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.slug = data.slug
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}

export class RoleModel implements TRole {
  id: number
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  permissions: PermissionModel[]

  constructor(data: TRole) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.slug = data.slug
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.permissions = data.permissions.map(p => new PermissionModel(p))
  }
}