import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function translateHttpFactory(
  httpClient: HttpClient,
  prefix: string,
  suffix: string
) {
  return new TranslateHttpLoader(httpClient, `${prefix}/`, suffix);
}
