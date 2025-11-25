import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserModel } from "../../data/mongo/models/user.model";
import { CustomError } from "../../domain/errors/custom.error";
import { UserEntity } from "../../domain/entities/user.entity";
import { bcryptAdapter } from "../../config";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

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

      // Set the existing password field to be the hashed password
      user.password = await bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return { user: userEntity, token: "ABC" };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  };

  loginUser = async (loginUserDto: LoginUserDto) => {
    const existingUser = await UserModel.findOne({
      email: loginUserDto.email,
    });

    if (!existingUser)
      throw CustomError.badRequest("User with this email does not exist");

    const isPasswordValid = await bcryptAdapter.compare(
      loginUserDto.password,
      existingUser.password
    );

    if (!isPasswordValid) throw CustomError.badRequest("Invalid password");

    const { password, ...userEntity } = UserEntity.fromObject(existingUser);

    return { user: userEntity, token: "ABC" };
  };
}
