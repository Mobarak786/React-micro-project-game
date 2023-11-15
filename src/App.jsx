import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import Home from "./pages/Home";

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
