import { NgModule } from "@angular/core";
import { AppComponent } from "@core/bootstrap/components/app/app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { translateHttpFactory } from "@core/i18n/loaders/browser-translate.loader";

import { AppModule } from "./app.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { CoreModule } from "@core/core.module";
import {
  TRANSLATION_PREFIX,
  TRANSLATION_SUFFIX
} from "@core/i18n/interfaces/translation.interface";

@NgModule({
  imports: [
    CoreModule,
    AppModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpFactory,
        deps: [HttpClient, TRANSLATION_PREFIX, TRANSLATION_SUFFIX]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
