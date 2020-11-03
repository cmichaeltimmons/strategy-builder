import Range from "../utils/Range";
import { HERO_RANGE, VILLIAN_RANGE } from "../store";
export default function combosSelected(hero, combos) {
  //convert combos to hand ranges
  const range = new Range(combos).hands;
  const type = hero ? HERO_RANGE : VILLIAN_RANGE;
  return {
    type,
    payload: range,
  };
}
