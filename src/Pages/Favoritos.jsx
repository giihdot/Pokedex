import { useState, useEffect } from "react";

function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Pokémons Favoritos</h1>
      {favorites.length > 0 ? (
        favorites.map((pokemon) => (
          <div key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.type}</p>
            <p>{pokemon.ability}</p>
            <p>{pokemon.stat}</p>
            <button onClick={() => removeFavorite(pokemon.id)}>Remover</button>
          </div>
        ))
      ) : (
        <p>Nenhum Pokémon favoritado.</p>
      )}
    </div>
  );
}

export default Favoritos;
