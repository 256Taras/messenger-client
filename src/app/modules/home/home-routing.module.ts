import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

export const homeRoutes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./page/home-page.module").then((m) => m.HomePageModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes)]
})
export class HomeRoutingModule {}
