import { NgModule } from "@angular/core";
import {
  ServerModule,
  ServerTransferStateModule
} from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "@core/bootstrap/components/app/app.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { CoreModule } from "@core/core.module";
import { serverTranslateFactory } from "@core/i18n/loaders/server-translate.loader";
import {
  TRANSLATION_PREFIX,
  TRANSLATION_SUFFIX
} from "@core/i18n/interfaces/translation.interface";

@NgModule({
  imports: [
    AppModule,
    CoreModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: serverTranslateFactory,
        deps: [TRANSLATION_PREFIX, TRANSLATION_SUFFIX]
      }
    }),
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
