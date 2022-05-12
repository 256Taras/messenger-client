import { TranslationConfig } from "./interfaces/translation-service.interface";
import { environment } from "@environment";

export const TRANSLATION_LANG_DEFAULT = environment.translation.language;

export const TRANSLATION_PREFIX_DEFAULT = "assets/i18n";
export const TRANSLATION_SUFFIX_DEFAULT = ".json";

export const TRANSLATION_CONFIG_DEFAULT: TranslationConfig = {
  language: TRANSLATION_LANG_DEFAULT,
  languages: environment.translation.languages
};
