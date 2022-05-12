import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppBrowserModule } from "./app/app.browser.module";

import { environment } from "@environment";

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    // eslint-disable-next-line no-undef
    .catch((err) => console.error(err));
}

// eslint-disable-next-line no-undef
if (document.readyState === "complete") {
  bootstrap();
} else {
  // eslint-disable-next-line no-undef
  document.addEventListener("DOMContentLoaded", bootstrap);
}
