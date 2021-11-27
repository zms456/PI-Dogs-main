import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import Dog from "./Components/Dog/Dog"

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create/dog" element={<Dog />} />
      </Routes>
    </div>
  );
}

export default App;
