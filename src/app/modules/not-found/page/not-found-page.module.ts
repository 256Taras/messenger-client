import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NotFoundPageComponent } from "./not-found-page.component";
import { RouterModule } from "@angular/router";

const routes = [
  { path: "not-found", component: NotFoundPageComponent },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [NotFoundPageComponent]
})
export class NotFoundPageModule {}
