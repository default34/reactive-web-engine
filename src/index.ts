import { has } from "ramda";
import { interval, merge, constant, Stream } from "kefir";
import { mods } from "./mods";
import { pool, store } from "./utils";

export const gin = <T>(initialState: T) => {
  let action$ = pool();

  let ticker$ = interval(1000, 1).map(
    (_) =>
      function tick(state: T) {
        mods.forEach((mod) => {
          if (has("onTick", mod) && typeof mod.onTick == "function") {
            state = mod.onTick(state);
          }
        });

        return state;
      }
  );

  let state$: Stream<T, any> = store(merge([constant(() => initialState), action$, ticker$]));

  return {
    state$,
    action$,
  };
};
