import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { authRoutes } from "@auth/auth.common";
import { LayoutModule } from "@ui/templates/layout/layout.module";

@NgModule({
  imports: [CommonModule, LayoutModule, RouterModule.forChild(authRoutes)]
})
export class AuthModule {}
