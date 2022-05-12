import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { SignUpFields } from "@auth/interfaces/sign-up-request-dto.interface";
import { AuthFacadeService } from "../../../services/auth-facade.service";

@Component({
  selector: "app-sing-up-page",
  templateUrl: "./sing-up-page.component.html",
  styleUrls: ["./sing-up-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// @ts-ignore
export class SingUpPageComponent implements OnInit {
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
      this._authFacadeService.signSignUp({ ...this.form.value });
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
