import React, { useEffect } from "react";
import { pfIndexToPocket } from "../utils/handMappings";
import Selection from "@simonwep/selection-js";
import combosSelected from "../actions/combosSelected";
import store from "../store";

const RangeBuilder = (props) => {
  const player = props.hero ? "hero" : "villain";
  const classString = player + "-selection";
  useEffect(() => {
    Selection.create({
      // eslint-disable-line no-unused-vars
      class: "selection",
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
        store.dispatch(
          combosSelected(
            props.hero,
            inst.getSelection().map((e) => e.innerHTML)
          )
        );
      });
  }, [props.hero, classString]);
  return (
    <div>
      <section
        style={{ display: "flex", flexWrap: "wrap", width: "390px" }}
        class={`box-wrap boxes green ${classString}`}
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
