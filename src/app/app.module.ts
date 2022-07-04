import { NgModule } from "@angular/core";
import { NotFoundModule } from "./modules/not-found/not-found.module";
import { HomeModule } from "./modules/home/home.module";
import { AuthModule } from "@auth/auth.module";

@NgModule({
  imports: [
    HomeModule,
    AuthModule,
    /**
     * The not-found page should be the last
     */
    NotFoundModule
  ]
})
export class AppModule {}
