import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthController {
  // DEPENDENCY INJECTION of the AuthService
  // This pattern is necessary to avoid coupling between the controller and the service
  constructor(public readonly authService: AuthService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerUser = async (req: Request, res: Response) => {
    const [errorMessage, registerUserDto] = RegisterUserDto.create(req.body);

    if (errorMessage) return res.status(400).json({ error: errorMessage });

    try {
      const user = await this.authService.registerUser(registerUserDto!);

      res.json(user);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    res.json("loginUser");
  };

  validateEmail = async (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}
