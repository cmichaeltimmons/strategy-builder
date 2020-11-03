export default function evaluate() {
  return async (dispactch, getState) => {
    console.log("called");
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
    console.log(json);
  };
}
