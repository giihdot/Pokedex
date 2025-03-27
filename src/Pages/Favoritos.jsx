import { useState, useEffect } from "react";
import "./Favoritos.css"

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
      <h1>POKÉMONS - FAVORITOS </h1>
      {favorites.length > 0 ? (
        favorites.map((pokemon) => (
          <div className="Flex-Box" key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            {/* <p>{pokemon.types}</p>
            <p>{pokemon.abilities}</p>
            <p>{pokemon.stats}</p> */}
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
