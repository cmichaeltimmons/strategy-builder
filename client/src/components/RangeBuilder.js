import React, { useEffect } from "react";
import { pfIndexToPocket } from "../utils/handMappings";
import Selection from "@simonwep/selection-js";
import store from "../store";

const RangeBuilder = (props) => {
  const player = props.hero ? "hero" : "villain";
  const classString = player + "-selection";
  const actionType = props.hero ? "HERO_RANGE" : "VILLIAN_RANGE";
  useEffect(() => {
    const selection = Selection.create({
      // eslint-disable-line no-unused-vars
      class: "hero-selection",
      selectables: [`.${classString} > div`],
      boundaries: [".box-wrap"],
    })
      .on("move", ({ changed: { removed, added } }) => {
        for (const el of added) {
          el.classList.add("selected");
        }
        for (const el of removed) {
          el.classList.remove("selected");
        }
      })
      .on("stop", ({ inst }) => {
        inst.keepSelection();
        store.dispatch({
          type: actionType,
          payload: inst.getSelection().map((e) => e.innerHTML),
        });
      });
  }, []);
  return (
    <div>
      <section
        style={{ display: "flex", flexWrap: "wrap", width: "390px" }}
        class={`box-wrap boxes green ${player}-selection`}
      >
        {Object.keys(pfIndexToPocket).map((pfIndex) => (
          <div
            style={{
              textAlign: "center",
              lineHeight: "30px",
              width: "30px",
              height: "30px",
              margin: "0",
            }}
          >
            {pfIndexToPocket[pfIndex]}
          </div>
        ))}
      </section>
    </div>
  );
};

export default RangeBuilder;
