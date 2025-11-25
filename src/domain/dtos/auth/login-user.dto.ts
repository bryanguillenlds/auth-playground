import { regularExps } from "../../../config";

export class LoginUserDto {
  // Private because we don't want to instantiate this directly, but rather use the static method
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email", undefined];
    if (!regularExps.email.test(email)) return ["Invalid email", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 6)
      return ["Password must be at least 6 characters long", undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
