import { Injectable } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";
import { readFileSync } from "fs";
import { join } from "path";
import { Observable } from "rxjs";

export function serverTranslateFactory(prefix: string, suffix: string) {
  return new ServerTranslateLoader(prefix, suffix);
}

@Injectable()
export class ServerTranslateLoader implements TranslateLoader {
  public constructor(
    private prefix: string = "",
    private suffix: string = ""
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const assets_folder = join("browser", this.prefix);
      const jsonData = JSON.parse(
        readFileSync(`${assets_folder}/${lang}${this.suffix}`, "utf8")
      );
      observer.next(jsonData);
      observer.complete();
    });
  }
}
