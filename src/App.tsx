import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Battle from "./pages/Battle";
import CharacterProfile from "./pages/CharacterProfile";
import Landing from "./pages/Landing";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
