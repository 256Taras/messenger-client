import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import {
  TRANSLATION_CONFIG,
  TranslationConfig,
  TranslationService
} from "../interfaces/translation-service.interface";
import { TranslationStorage } from "../interfaces/translation-storage.interface";
import { TRANSLATION_LANG_DEFAULT } from "../translation.common";

@Injectable()
export class BaseTranslationService implements TranslationService {
  public constructor(
    private translateService: TranslateService,
    private translationStorage: TranslationStorage,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(TRANSLATION_CONFIG) private translationConfig: TranslationConfig
  ) {}

  public init(config?: TranslationConfig): Observable<any> {
    if (!config) {
      config = this.getConfig();
    }
    this.translateService.addLangs(config.languages);
    this.translateService.setDefaultLang(config.language);
    if (typeof config.currentLanguage === "string") {
      this.translationStorage.setLanguage(config.currentLanguage);
    }

    return this.translateService.use(<string>config.currentLanguage);
  }

  public getConfig(): TranslationConfig {
    const languages = this.translationConfig.languages || [
      TRANSLATION_LANG_DEFAULT
    ];
    let language = this.translationConfig.language || null;
    if (!language) {
      // If browser, select locale from browser
      if (isPlatformBrowser(this.platformId)) {
        // eslint-disable-next-line no-undef
        language = window.navigator.language.split("-").shift() as
          | string
          | null;
      }
      if (!language) {
        language = languages[0];
      }
    }
    const currentLanguage = this.translationStorage.getLanguage() || language;

    return {
      languages,
      language,
      currentLanguage
    };
  }

  public getLanguage(): string {
    return this.translateService.currentLang;
  }

  public getLanguages(): string[] {
    return this.translateService.getLangs();
  }

  public setLanguage(language: string): Observable<string> {
    this.translationStorage.setLanguage(language);

    return this.translateService.use(language);
  }
}
