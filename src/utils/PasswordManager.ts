import bcrypt from "bcrypt";

export default class PasswordManager {
  private static SALT_ROUNDS = 10;

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, PasswordManager.SALT_ROUNDS);
  }

  public static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
