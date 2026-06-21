import { error } from "#build/ui"

export interface TAddInternalUserPayload {
  fullName: string
  mobile: string
  email: string
  password: string
  is_active: boolean
  role_ids: number[]
  department_ids: number[]
}

export interface TAddInternalUserResponse {
  success: boolean,
  message: string,
  data: TEmployee
}

export interface Role {
  id: number
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: number
  name: string
  description: string
  slug: string
  isActive: 0 | 1
  createdAt: string
  updatedAt: string
}

export type UserType = 'internal' | 'external'

export interface TEmployee {
  id: number
  fullName: string
  mobile: string
  email: string
  userType: UserType
  isActive: 0 | 1
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  roles: Role[]
  departments: Department[]
  avatar?: string | null
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface PaginatedData<T> {
  meta: PaginationMeta
  data: T[]
}

export interface TServerResponse<T> {
  success: boolean
  message: string
  data: T | null
}

export type GetEmployessResponse = TServerResponse<PaginatedData<TEmployee>>