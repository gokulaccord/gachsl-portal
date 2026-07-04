export interface LoginResponse {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  token: string;
  role: string;
  refreshToken: string;
}