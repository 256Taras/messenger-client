import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ButtonModule } from "@ui/atoms/button/button.module";
import { SignInPageComponent } from "@auth/modules/sing-in/page/sign-in-page.component";
import { TextFiledModule } from "@ui/atoms/text-filed/text-filed.module";
export const route: Routes = [
  {
    component: SignInPageComponent,
    path: ""
  }
];

@NgModule({
  declarations: [SignInPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    ButtonModule,
    TextFiledModule
  ]
})
export class SignInPageModule {}
