import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./Pages/Pokedex"
import Favoritos from "./Pages/Favoritos"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/"> Pokedéx </Link></li>
          <li><Link to="/favoritos"> Favoritos </Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App