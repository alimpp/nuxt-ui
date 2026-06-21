export interface TLoginPayload {
    identifier: string,
    password: string
}

export interface TVerifyOtpPayload {
    mobile: string | number,
    code: string | number
}

export interface TResponseServer {
  success?: boolean;
  message?: string;
  data: UserData;
}

export interface UserData {
  user: User;
  token: AuthToken;
}

export interface User {
  id: number;
  fullName: string;
  mobile: string;
  email: string;
  userType: string;
  isActive: number;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
  avatar?: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  type: string;
  name: string;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string | null;
}