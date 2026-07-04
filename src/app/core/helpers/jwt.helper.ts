import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload.model';

export class JwtHelper {

  static decode(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null;
    }
  }
}