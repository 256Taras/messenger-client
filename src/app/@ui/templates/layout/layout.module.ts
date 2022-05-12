import { NgModule } from "@angular/core";

import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { HeaderModule } from "@ui/templates/layout/components/header/header.module";
import { FooterModule } from "@ui/templates/layout/components/footer/footer.module";
import { RouterModule } from "@angular/router";
import { ContainerModule } from "@ui/atoms/container/container.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule,
    ContainerModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {}
