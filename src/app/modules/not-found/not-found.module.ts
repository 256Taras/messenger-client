import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./page/not-found-page.module").then((m) => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class NotFoundModule {}
