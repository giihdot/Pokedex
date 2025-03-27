import { useState, useEffect } from "react";
import "./Favoritos.css";

function Favoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Recupera os favoritos do localStorage ou define como um array vazio caso não haja dados
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []); // O array vazio [] garante que o efeito só seja executado uma vez após o componente ser montado

  function removeFavorite(id) {
    // Filtra a lista de favoritos, removendo o Pokémon com o 'id' passado
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites); // Atualiza o estado com a nova lista sem o Pokémon removido
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  return (
    <div>
      <h1>POKÉMONS - FAVORITOS </h1>

      {favorites.length > 0 ? (
        // Se houver favoritos, mapeia a lista e exibe cada Pokémon
        favorites.map((pokemon) => (
          <div className="Flex-Box" key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
            <button onClick={() => removeFavorite(pokemon.id)}>Remover</button>
          </div>
        ))
      ) : (
        // Caso não haja favoritos, exibe esta mensagem
        <p>Nenhum Pokémon favoritado.</p>
      )}
    </div>
  );
}

export default Favoritos;
