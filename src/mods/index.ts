export const mods = [
  {
    mod: "damage",
    onTick: (state: any) => ({ ...state, hp: (state.hp -= 1) }),
  },

  {
    mod: "tick",
    onTick: (state: any) => ({
      ...state,
      timestamp: (state.timestamp += state.interval * state.timerate),
    }),
  },

  {
    mod: "counter",
    onTick: (state: any) => ({ ...state, counter: (state.counter += 1) }),
  },
];
