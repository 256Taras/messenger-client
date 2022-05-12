import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInPageModule } from "@auth/modules/sing-in/page/sign-in-page.module";

@NgModule({
  imports: [CommonModule, SignInPageModule]
})
export class SingInModule {}
