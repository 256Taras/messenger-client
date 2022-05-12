import * as t from "io-ts/lib/index";
import { pipe } from "fp-ts/function";
import { fold, left } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import { Observable, of, throwError } from "rxjs";

export class DecodeError extends Error {}

type Result<Codec extends t.Mixed> = (
  json: unknown
) => Observable<t.TypeOf<Codec>>;
type Decode = <Codec extends t.Mixed>(codec: Codec) => Result<Codec>;

export const decode: Decode =
  <Codec extends t.Mixed>(codec: Codec): Result<Codec> =>
  (json) =>
    pipe(
      codec.decode(json),
      fold(
        (error) =>
          throwError(
            () => new DecodeError(PathReporter.report(left(error)).join("\n"))
          ),
        (data) => of(data)
      )
    );
