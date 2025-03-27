// src/Pages/Home.js
import { useState, useEffect } from "react";
import "./Pokede.css"; // Importa o CSS

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Aplica o tema ao carregar a página
  useEffect(() => {
    document.body.classList.remove("light", "dark"); // Remove classes antigas
    document.body.classList.add(theme); // Adiciona a classe do tema atual
  }, [theme]);

  // Busca o Pokémon pelo nome ou ID
  const handleSearch = async () => {
    if (!search) return;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      const data = await response.json();
      setPokemon(data);
    } catch {
      setPokemon(null);
    }
  };

  // Adiciona Pokémon aos favoritos
  const addToFavorites = () => {
    if (!pokemon) return;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      favorites.push({ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  // Alterna entre tema claro e escuro e salva no LocalStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Armazena no LocalStorage
  };

  return (
    <div className="container">
      <h1 className="title">Pokédex</h1>
      <input type="text" placeholder="Nome ou ID" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
      <button onClick={toggleTheme}>
        Mudar para {theme === "light" ? "Modo Escuro" : "Modo Claro"}
      </button>
      {pokemon && (
        <div className="pokemon-container">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <button onClick={addToFavorites}>Favoritar</button>
        </div>
      )}
    </div>
  );
}

export default Home;