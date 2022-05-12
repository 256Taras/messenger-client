import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./home-page.component";
import { RouterModule } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

const route = [
  {
    path: "",
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    TranslateModule
  ],
  providers: [HttpClient]
})
export class HomePageModule {}
