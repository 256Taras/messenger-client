import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SingUpPageComponent } from "./sing-up-page.component";
import { RouterModule, Routes } from "@angular/router";
import { TextFiledModule } from "@ui/atoms/text-filed/text-filed.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "@ui/atoms/button/button.module";

export const route: Routes = [
  {
    component: SingUpPageComponent,
    path: ""
  }
];

@NgModule({
  declarations: [SingUpPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TextFiledModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class SingUpPageModule {}
