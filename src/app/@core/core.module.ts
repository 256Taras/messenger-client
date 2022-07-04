import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { TransferHttpCacheModule } from "@nguniversal/common";

import { coreContainers } from "./core.common";
import { LoggerModule } from "@core/logger/logger.module";
import { environment } from "@environment";
import { TranslationModule } from "@core/i18n/translation.module";
import { TRANSLATION_PREFIX_DEFAULT } from "@core/i18n/translation.common";
import { BASE_API_URL } from "@core/config/base-api-url";

@NgModule({
  declarations: [...coreContainers],
  imports: [
    /**
     * But this strategy PreloadAllModules may not be the best solution since Angular will load all modules, even those that the user visits very rarely. What we can do? Lets define our own Preload Strategy.
     */
    RouterModule.forRoot([], {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: "enabled",
      initialNavigation: "enabledNonBlocking",
      scrollPositionRestoration: "enabled"
    }),
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    LoggerModule.forRoot(environment.logging),
    TranslationModule.forRoot({
      prefix: TRANSLATION_PREFIX_DEFAULT
    })
  ],
  exports: [RouterModule],
  providers: [{ provide: BASE_API_URL, useValue: environment.baseUrl }]
})
export class CoreModule {}
