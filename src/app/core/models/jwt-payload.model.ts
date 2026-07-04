export interface JwtPayload {

  // standard-ish JWT claims
  nameid?: string;
  email?: string;
  name?: string;

  // your custom backend claims
  FullName?: string;
  role?: string;

  // optional future fields
  exp?: number;
  iss?: string;
  aud?: string;
}