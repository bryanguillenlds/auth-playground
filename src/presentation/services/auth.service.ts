import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserModel } from "../../data/mongo/models/user.model";
import { CustomError } from "../../domain/errors/custom.error";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {
  constructor() {}

  registerUser = async (registerUserDto: RegisterUserDto) => {
    const existingUser = await UserModel.findOne({
      email: registerUserDto.email,
    });

    if (existingUser)
      throw CustomError.badRequest("User with this email already exists");

    try {
      const user = new UserModel(registerUserDto);
      await user.save();

      // TODO: Encrypt password, email validation and generate JWT for authentication

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: "ABC" };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };
}
