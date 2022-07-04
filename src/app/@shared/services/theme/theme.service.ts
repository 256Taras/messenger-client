import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { first, fromEvent, Observable, tap } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { ThemeSettings } from "./theme-settings";
import { LocalStorage } from "@core/storage/storages/local.storage";
import { DestroyService } from "@shared/services/destroy/destroy.service";

/**
 *  User interface theme manager (dark or light).
 *
 *  It implements the default theme of the operating system.
 *
 *  This service can change the theme mode:
 *  - When requested by the user within the application.
 *  - When requested by the user from the theme configuration in the operating system.
 *
 *  If user chooses the theme mode from the web application its configuration is persisted in local storage.
 *
 * @export
 * @class ThemeService
 */
@Injectable({
  providedIn: "root"
})
export class ThemeService {
  /** The light mode background css class name to be attached to HTML Body element. */
  private static readonly LIGHT_MODE_CSS_CLASS_NAME: string = "theme-alternate";

  /** Name of the local storage key value to query and persist the theme settings. */
  private static readonly SETTINGS_KEY: string = "theme";

  /**
   * CSS media feature that is used to detect if the user has requested a light or dark color theme.
   * The user might indicate this preference through an operating system setting (e.g. light or dark mode).
   * */
  private static readonly SYSTEM_DARK_MODE_MEDIA_QUERY =
    "(prefers-color-scheme: dark)";

  /** DOM renderer */
  private readonly renderer: Renderer2;

  /** Settings for the visual appearance of the user interface. */
  private settings: ThemeSettings | undefined;

  /**
   * Returns and deserializes the current value associated with the given key in Local Storage, or null if the given key
   *
   * @param {string} key The name of the key you want to retrieve the value of.
   * @returns {*} The value of the key. If the key does not exist, undefined is returned.
   * @private
   */
  private _getDefaultSettings(key: string): Observable<any> {
    return this._localStorage.getItem(key).pipe(
      tap(
        (serializedValue) =>
          (this.settings = serializedValue
            ? JSON.parse(serializedValue)
            : undefined)
      ),
      tap(() => {
        if (!this.settings) {
          this.settings = new ThemeSettings();
          this.settings.darkMode = this.isSystemDark();
          this.startSystemModeSynchronization();
        }
      }),
      first()
    );
  }

  /**
   * Constructor.
   * @param _localStorage Abstraction written on top of native localstorage
   * @param _destroy$  Service for unsubscribing from observers
   * @param {Document} document Web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree..
   * @param {RendererFactory2} rendererFactory Creates and initializes a custom renderer that implements the Renderer2 base class.
   */
  private constructor(
    private readonly _localStorage: LocalStorage,
    private readonly _destroy$: DestroyService,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this._getDefaultSettings(ThemeService.SETTINGS_KEY).subscribe();
  }

  /**
   *  Check if the user Operative System theme preference is dark mode.
   */
  public isSystemDark(): boolean {
    return this.document.defaultView?.matchMedia(
      ThemeService.SYSTEM_DARK_MODE_MEDIA_QUERY
    ).matches!;
  }

  /**
   * Set the theme mode.
   * @param darkMode True for dark mode. False for light mode.
   */
  private setMode(darkMode: boolean): void {
    if (darkMode) {
      this.renderer.removeClass(
        this.document.body,
        ThemeService.LIGHT_MODE_CSS_CLASS_NAME
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        ThemeService.LIGHT_MODE_CSS_CLASS_NAME
      );
    }
  }

  /** Apply the theme mode stored in the settings. */
  public apply(): void {
    this.setMode(!!this.settings?.darkMode);
  }

  /**
   * Observe and apply any future changes of user preferences of the theme mode through the operating system (dark or light).
   *
   * If the user decides to change the theme through the operating system, the changes will be immediately reflected in the application.
   *
   * @private
   */
  private startSystemModeSynchronization(): void {
    if (this.document.defaultView) {
      fromEvent(
        this.document.defaultView.matchMedia(
          ThemeService.SYSTEM_DARK_MODE_MEDIA_QUERY
        ),
        "change"
      )
        .pipe(
          map((e: Event) => {
            const mediaQueryListEventMediaQueryListEvent: MediaQueryListEvent =
              e as MediaQueryListEvent;
            const darkMode = mediaQueryListEventMediaQueryListEvent
              ? mediaQueryListEventMediaQueryListEvent.matches
              : this.isSystemDark();
            this.setMode(darkMode);
          }),
          takeUntil(this._destroy$)
        )
        .subscribe();
    }
  }

  /** Apply the theme mode according to the user's operating system preferences. */
  public setSystemMode(): void {
    const darkMode = this.isSystemDark();
    this.setMode(darkMode);
    this.startSystemModeSynchronization();
    this._localStorage.removeItem(ThemeService.SETTINGS_KEY);
  }

  /**
   * Apply and persist in the configuration the theme mode chosen by the user within the application.
   * @param darkMode True for dark mode. False for light mode.
   */
  public setUserDefinedMode(darkMode: boolean): void {
    this.setMode(darkMode);
    this.settings = { darkMode };
    this._localStorage.setItem(ThemeService.SETTINGS_KEY, this.settings);
  }

  /**
   * Apply light mode.
   * */
  public setLightMode() {
    this.setUserDefinedMode(false);
  }

  /**
   *  Apply dark mode.
   */
  public setDarkMode() {
    this.setUserDefinedMode(true);
  }
}
