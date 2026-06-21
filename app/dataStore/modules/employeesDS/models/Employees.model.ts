import type { TEmployee, Role, Department, UserType } from '@/types/employees/index'

export class RoleModel implements Role {
  id: number
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string

  constructor(data: Role) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.slug = data.slug
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

}

export class DepartmentModel implements Department {
  id: number
  name: string
  description: string
  slug: string
  isActive: 0 | 1
  createdAt: string
  updatedAt: string

  constructor(data: Department) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.slug = data.slug
    this.isActive = data.isActive
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }

}

export class EmployeeModel implements TEmployee {
  id: number
  fullName: string
  mobile: string
  email: string
  userType: UserType
  isActive: 0 | 1
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  roles: RoleModel[]
  departments: DepartmentModel[]

  constructor(data: TEmployee) {
    this.id = data.id
    this.fullName = data.fullName
    this.mobile = data.mobile
    this.email = data.email
    this.userType = data.userType
    this.isActive = data.isActive
    this.lastLoginAt = data.lastLoginAt
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.roles = data.roles.map(r => new RoleModel(r))
    this.departments = data.departments.map(d => new DepartmentModel(d))
  }

}