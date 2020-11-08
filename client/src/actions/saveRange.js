export default function saveRange() {
  return async (dispatch, getState) => {
    if (getState().hero.length == 0 || getState().villian.length == 0) {
      return;
    }
    const response = await fetch("api/ranges", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "default",
        range: getState()
          .hero.map((a) => a[0] + a[1])
          .reduce((a, c) => a + "," + c),
      }),
    });
    const json = await response.json();
    console.log(json);
  };
}
