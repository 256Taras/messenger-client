import {
  ISignInRequestDto,
  SignInFiles
} from "@auth/interfaces/sign-in-request-dto.interface";

export interface ISignUpRequestDto extends ISignInRequestDto {
  readonly username: string;
}

export const SignUpFields = {
  ...SignInFiles,
  Username: "username"
};
