import jwt from "jsonwebtoken";

export interface JWTData {
  id: number;
  username: string;
  admin: boolean;
}

export default class JWTManager {
  private static secret = (process.env.JWT_SECRET as string) || "secret";
  private static expiresIn = "1d";
  private static expiresInDate = 60 * 60 * 24 * 1000; // 1 day in milliseconds

  constructor() {}

  generateToken({ data }: { data: JWTData }): string {
    return jwt.sign(data, JWTManager.secret, {
      expiresIn: JWTManager.expiresIn,
    });
  }

  verifyToken(token: string): Promise<JWTData> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWTManager.secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as JWTData);
        }
      });
    });
  }

  static getExpiresInDate(): number {
    return JWTManager.expiresInDate;
  }
}
