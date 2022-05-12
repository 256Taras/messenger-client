import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ISignInRequestDto } from "@auth/interfaces/sign-in-request-dto.interface";
import { BASE_API_URL } from "@core/config/base-api-url";
import { ISignUpRequestDto } from "@auth/interfaces/sign-up-request-dto.interface";

/**
 * @description Auth api service
 */
@Injectable({
  providedIn: "root"
})
export class AuthApiService {
  public constructor(
    private readonly _http: HttpClient,
    @Inject(BASE_API_URL) private readonly _url: string
  ) {}

  /**
   * @description Register new user
   * @implements {ISignInRequestDto}
   * @param payload
   */
  public signIn(payload: ISignInRequestDto) {
    return this._http.post(`${this._url}/sing-in`, payload);
  }

  /**
   * @description Login user
   * @implements {ISignUpRequestDto}
   * @param payload
   */
  public signUp(payload: ISignUpRequestDto) {
    return this._http.post(`${this._url}/sing-in`, payload);
  }
}
