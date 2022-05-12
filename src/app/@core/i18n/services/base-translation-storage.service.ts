import { Injectable } from "@angular/core";

import { TranslationStorage } from "../interfaces/translation-storage.interface";
import { CookieService } from "@core/storage/services/cookie.service";

/**
 * Keys for storage
 */
export const TRANSLATION_STORAGE_KEYS = {
  language: "language"
};

@Injectable()
export class BaseTranslationStorage implements TranslationStorage {
  public constructor(private readonly _cookieService: CookieService) {}

  public getLanguage(): string | null {
    return this._cookieService.get(TRANSLATION_STORAGE_KEYS.language) || null;
  }

  public removeLanguage(): void {
    this._cookieService.delete(TRANSLATION_STORAGE_KEYS.language);
  }

  public setLanguage(language: string): void {
    this._cookieService.set(TRANSLATION_STORAGE_KEYS.language, language);
  }
}
