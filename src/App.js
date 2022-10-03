import globe from './globe.svg';
import h from './h.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="badge">
          <img src={globe} className="globe" alt="logo" />
          <img src={h} className="h" alt="logo" />
        </div>
        <p>
          Hacktoberfest 2022
        </p>
      </header>
    </div>
  );
}

export default App;
