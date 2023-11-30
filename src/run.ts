import { gin } from "./index";

type InitialState = {
  counter: number;
  hp: number;
  interval: number;
  timestamp: number;
  timerate: 86400;
};

const initialState: InitialState = {
  counter: 0,
  hp: 100,
  interval: 1000,
  timestamp: 1,
  timerate: 86400,
};

let _gin = gin(initialState);

_gin.state$
  //.throttle(3000, {leading: false})
  .observe(
    (data: InitialState) => {
      console.log(data, new Date(data.timestamp));
    },
    (err) => console.log(err),
    () => console.log("end")
  );

// setTimeout(() => {
//   gin.action$.plug(state => ({...state, timestamp: state.timestamp += 1000000000}))
// }, 3000)
