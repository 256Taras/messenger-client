export interface ISignInRequestDto {
  readonly email: string;
  readonly password: string;
}

export const SignInFiles = {
  Email: "email",
  Password: "password"
};
