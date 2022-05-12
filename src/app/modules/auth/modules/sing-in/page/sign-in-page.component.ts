import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { AuthFacadeService } from "@auth/services/auth-facade.service";
import { SignUpFields } from "@auth/interfaces/sign-up-request-dto.interface";

@Component({
  selector: "app-sign-in-page",
  templateUrl: "./sign-in-page.component.html",
  styleUrls: ["./sign-in-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  public form!: FormGroup;

  public readonly fields = SignUpFields;

  public constructor(private readonly _authFacadeService: AuthFacadeService) {}

  /**
   * Getters
   */
  public get isFormValid(): boolean {
    return this.form.invalid;
  }

  public ngOnInit(): void {
    this._initializeForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      // this._authFacadeService.signSignUp({ ...this.form.value });
    }
  }

  private _initializeForm(): void {
    this.form = new FormGroup({
      [this.fields.Email]: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      [this.fields.Username]: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      [this.fields.Password]: new FormControl("", [Validators.required])
    });
  }
}
