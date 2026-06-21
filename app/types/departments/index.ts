export interface Department {
  id: number;
  name: string;
  description: string;
  slug: string;
  isActive: 0 | 1;
  createdAt: string;
  updatedAt: string;
}

export interface TServerResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type GetDepartmentsResponse = TServerResponse<Department[]>;