import { EQUITIES_RETURNED } from "../store.js";
export default function evaluate() {
  return async (dispatch, getState) => {
    if (getState().hero.length == 0 || getState().villian.length == 0) {
      return;
    }
    const response = await fetch("api/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hero: getState()
          .hero.map((a) => a[0] + a[1])
          .reduce((a, c) => a + "," + c),
        villian: getState()
          .villian.map((a) => a[0] + a[1])
          .reduce((a, c) => a + "," + c),
      }),
    });
    const json = await response.json();
    dispatch({
      type: EQUITIES_RETURNED,
      payload: {
        hero: json.hero,
        villian: json.villian,
      },
    });
  };
}
