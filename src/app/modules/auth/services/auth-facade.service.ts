import { Injectable } from "@angular/core";
import { EMPTY, Observable, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthApiService } from "@auth/api/auth-api.service";
import { ISignInRequestDto } from "@auth/interfaces/sign-in-request-dto.interface";
import { ISignUpRequestDto } from "@auth/interfaces/sign-up-request-dto.interface";
import { NavigationService } from "@core/navigation/service/navigation.service";
import { NavigationPath } from "@core/navigation/common/navigation.interface";
import { StateSubject } from "@shared/utils/state-subject";

interface IAuthState {
  authRun: boolean;
  authError: null | Error;
}

@Injectable({
  providedIn: "root"
})
export class AuthFacadeService {
  private _state = new StateSubject<IAuthState>({
    authError: null,
    authRun: false
  });

  public readonly $state = this._state.value$;

  public constructor(
    private readonly _authApiService: AuthApiService,
    private _navigationService: NavigationService
  ) {}

  public signIn(dto: ISignInRequestDto): Observable<any> {
    this._state.value.authRun = true;
    return this._authCommon(
      this._authApiService.signIn(dto),
      NavigationPath.Home
    );
  }

  public signSignUp(dto: ISignUpRequestDto): Observable<Object> {
    return this._authCommon(
      this._authApiService.signUp(dto),
      NavigationPath.singIn
    );
  }

  public _authCommon(
    source$: Observable<Object>,
    path: NavigationPath
  ): Observable<Object> {
    return source$.pipe(
      tap(() => {
        this._state.value.authRun = false;
        this._navigationService.navigateByUrl(path);
      }),
      catchError(({ error }: HttpErrorResponse) => {
        this._state.value.authRun = false;
        this._state.value.authError = error;
        return EMPTY;
      })
    );
  }
}
