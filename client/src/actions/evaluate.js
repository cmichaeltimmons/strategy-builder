export default function evaluate() {
  return (dispactch, getState) => {
    fetch("api/", {
      method: "post",
      body: JSON.stringify({
        hero: getState().hero,
        villian: getState().villian,
      }),
    }).then(() => console.log("server returned"));
  };
}
