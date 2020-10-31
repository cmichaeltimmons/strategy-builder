import React, { useEffect } from "react";
import { pfIndexToPocket } from "../utils/handMappings";
import Selection from "@simonwep/selection-js";
import store from "../store";

const Cell = function ({ value, index }) {
  return (
    <div
      style={{
        textAlign: "center",
        lineHeight: "30px",
        width: "30px",
        height: "30px",
        margin: "0",
      }}
    >
      {pfIndexToPocket[index]}
    </div>
  );
};

const RangeBuilder = (props) => {
  const actionType = props.hero ? "HERO_RANGE" : "VILLIAN_RANGE";
  useEffect(() => {
    const selection = Selection.create({
      // eslint-disable-line no-unused-vars
      class: "selection",
      selectables: [".box-wrap > div"],
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
  }, [actionType]);

  return (
    <div>
      <section
        style={{ display: "flex", flexWrap: "wrap", width: "390px" }}
        class="box-wrap boxes green"
      >
        {Object.keys(pfIndexToPocket).map((pfIndex) => (
          <Cell value={pfIndexToPocket[pfIndex]} index={pfIndex} />
        ))}
      </section>
    </div>
  );
};

export default RangeBuilder;
