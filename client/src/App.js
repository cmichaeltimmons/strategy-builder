import "./App.css";
import RangeBuilder from "./components/RangeBuilder";
import store from "./store";
import evaluate from "./actions/evaluate";

function App() {
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
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>Villian</h1>
            <RangeBuilder hero={false} />
          </div>
        </div>
        <button onClick={() => store.dispatch(evaluate())}>Evaluate</button>
      </main>
    </div>
  );
}

export default App;
