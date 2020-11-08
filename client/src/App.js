import "./App.css";
import RangeBuilder from "./components/RangeBuilder";
import store from "./store";
import evaluate from "./actions/evaluate";
import saveRange from "./actions/saveRange";
import { useSelector } from "react-redux";

function App() {
  const equities = useSelector((state) => state.equities);
  const heroCombos = useSelector((state) => state.hero).length;
  const villianCombos = useSelector((state) => state.villian).length;
  return (
    <div className="App">
      <main>
        <h1 style={{ textAlign: "center" }}>Strategy Builder</h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}>Hero</h1>
            <RangeBuilder hero={true} />
            <h3>Combos: {heroCombos}</h3>
            <h3>Equity: {equities.hero}</h3>
            <button onClick={() => store.dispatch(saveRange())}>Save</button>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>Villian</h1>
            <RangeBuilder hero={false} />
            <h3>Combos: {villianCombos}</h3>
            <h3>Equity: {equities.villian}</h3>
          </div>
        </div>
        <button onClick={() => store.dispatch(evaluate())}>Evaluate</button>
      </main>
    </div>
  );
}

export default App;
