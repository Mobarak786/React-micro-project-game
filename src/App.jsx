import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [symbol, setSymbol] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setSymbol={setSymbol} symbol={symbol} />}
        />
        <Route path="/game" element={<Game symbol={symbol} />} />
      </Routes>
    </Router>
  );
}

export default App;
