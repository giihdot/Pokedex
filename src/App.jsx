import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Pokedex from "./Components/Pokedex"
import Favoritos from "./Pages/Favoritos"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <nav className="naveg">
        <Link to="/"> POKEDÉX </Link>
        <Link to="/favoritos"> FAVORITOS </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/favoritos" element={<Favoritos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App