import { Inject, Injectable } from "@angular/core";

type TNoop = () => undefined;

export enum LoggerLevel {
  ALL = 1,
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF
}

export interface LoggerConfig {
  logLevel?: LoggerLevel;
  colorConfig?: LoggerColor;
  showLevel?: boolean;
}

export interface LoggerColor {
  [loggerLevel: number]: string;
}

@Injectable()
export class LoggerService {
  private readonly minLevel: LoggerLevel;
  private readonly colorLabel: Record<string, string> = {
    [LoggerLevel.TRACE]: "#000080",
    [LoggerLevel.DEBUG]: "#00BFFE",
    [LoggerLevel.INFO]: "#000000",
    [LoggerLevel.WARN]: "#FF6419",
    [LoggerLevel.ERROR]: "#F1062D"
  };

  public constructor(@Inject("LoggerConfig") private options?: LoggerConfig) {
    this.colorLabel = { ...this.colorLabel, ...options?.colorConfig };
    this.minLevel = options?.logLevel || LoggerLevel.DEBUG;
    if (options?.showLevel)
      this.debug("Logging levels: ", LoggerLevel[this.minLevel]);
  }

  public get assert() {
    // eslint-disable-next-line no-undef
    return console.assert.bind(console);
  }

  public get trace() {
    if (this.minLevel > LoggerLevel.TRACE) return this.noop;
    // eslint-disable-next-line no-undef
    return console.debug.bind(
      // eslint-disable-next-line no-undef
      console,
      "%c[TRACE]:",
      this.getStyleForLabel(LoggerLevel.TRACE)
    );
  }

  public get debug() {
    if (this.minLevel > LoggerLevel.DEBUG) return this.noop;
    // eslint-disable-next-line no-undef
    return console.log.bind(
      // eslint-disable-next-line no-undef
      console,
      "%c[DEBUG]:",
      this.getStyleForLabel(LoggerLevel.DEBUG)
    );
  }

  public get info() {
    if (this.minLevel > LoggerLevel.INFO) return this.noop;
    // eslint-disable-next-line no-undef
    return console.info.bind(
      // eslint-disable-next-line no-undef
      console,
      "%c[INFO]:",
      this.getStyleForLabel(LoggerLevel.INFO)
    );
  }

  public get warn() {
    if (this.minLevel > LoggerLevel.WARN) return this.noop;
    // eslint-disable-next-line no-undef
    return console.warn.bind(
      // eslint-disable-next-line no-undef
      console,
      "%c[WARNING]:",
      this.getStyleForLabel(LoggerLevel.WARN)
    );
  }

  public get error() {
    if (this.minLevel > LoggerLevel.ERROR) return this.noop;
    // eslint-disable-next-line no-undef
    return console.error.bind(
      // eslint-disable-next-line no-undef
      console,
      "%c[ERROR]:",
      this.getStyleForLabel(LoggerLevel.ERROR)
    );
  }

  public get table() {
    if (this.minLevel > LoggerLevel.DEBUG) return this.noop;
    // eslint-disable-next-line no-undef
    return console.table.bind(console);
  }

  public get clear() {
    // eslint-disable-next-line no-undef
    return console.clear.bind(console);
  }

  private static groupCollapsed(
    label: string,
    callback: Function,
    customTitle: string
  ) {
    // eslint-disable-next-line no-undef,no-prototype-builtins
    if (!console.hasOwnProperty("groupCollapsed")) callback();
    // eslint-disable-next-line no-undef
    console.groupCollapsed(`[${customTitle}]: ${label.toUpperCase()}`);
    callback();
    // eslint-disable-next-line no-undef
    console.groupEnd();
  }

  public group(
    label: string,
    callback: Function,
    customTitle: string = "INFO"
    // @ts-ignore
  ): TNoop {
    if (this.minLevel === LoggerLevel.OFF) return this.noop;
    LoggerService.groupCollapsed(label, callback, customTitle);
  }

  private readonly noop = () => undefined;

  private getStyleForLabel(level: LoggerLevel) {
    return `color: ${this.colorLabel[level]}; font-weight: bold;`;
  }
}
