export interface ControllerResponse<T = unknown> {
  success: boolean
  message: string
}

export interface ServerResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}