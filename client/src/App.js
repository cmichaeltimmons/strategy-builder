import './App.css';
import RangeBuilder from './components/RangeBuilder'


function App() {
  return (
    <div className="App">
      <main>
        <h1 style={{textAlign: 'center'}}>Strategy Builder</h1>
      <div style={{display: "flex", width: '100%', justifyContent: 'space-around'}}>
      <div>
        <h1 style={{textAlign: 'center'}}>Hero</h1>
        <RangeBuilder hero={true}/>
      </div>
      <div>
        <h1 style={{textAlign: 'center'}}>Villian</h1>
      <RangeBuilder hero={false}/>
      </div>
      </div>
      </main>
    </div>
  );
}

export default App;
