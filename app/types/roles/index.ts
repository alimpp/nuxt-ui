export interface Permission {
  id: number
  name: string
  description: string | null
  slug: string
  createdAt: string
  updatedAt: string
}

export interface TRole {
  id: number
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
}

export interface TServerResponse<T> {
  success: boolean
  message: string
  data: T | null
}

export type GetRolesResponse = TServerResponse<TRole[]>