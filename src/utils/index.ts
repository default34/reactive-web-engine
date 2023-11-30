import { is } from "ramda";
import { pool as kpool, constant, Property, Stream, Observable } from "kefir";

export const store = <T>(action$: Observable<unknown, unknown>) => {
  return action$
    .scan((state: T, fn: unknown) => {
      if (is(Function, fn)) {
        return fn(state);
      } else {
        throw Error(`dispatched value must be a function, got ${typeof fn}`);
      }
    }, null as T)
    .skipDuplicates();
};

export const pool = () => {
  const _pool = kpool();
  const _plug = _pool.plug.bind(_pool);

  _pool.plug = (x) => {
    if (
      x instanceof Property ||
      x instanceof Stream ||
      x instanceof Observable
    ) {
      return _plug(x);
    } else {
      return _plug(constant(x));
    }
  };

  return _pool;
};
