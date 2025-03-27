// src/Pages/Home.js
import { useState, useEffect } from "react";
import "./Pokedex.css"; // Importa o CSS

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [Pesquisar, setPesquisar] = useState("");
  const [tema, setTema] = useState(localStorage.getItem("tema") || "light");

  // Aplica o tema ao carregar a página
  useEffect(() => {
    document.body.classList.remove("light", "dark"); // Remove classes antigas
    document.body.classList.add(tema); // Adiciona a classe do tema atual
  }, [tema]);

  // Busca o Pokémon pelo nome ou ID
  const Busquepok = async () => {
    if (!Pesquisar) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Pesquisar.toLowerCase()}`
      );
      const data = await response.json();
      setPokemon(data);
    } catch {
      setPokemon(null);
    }
  };

  // Adiciona Pokémon aos favoritos
  const addFavorites = () => {
    if (!pokemon) return;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (!favoritos.some((fav) => fav.id === pokemon.id)) {
      favoritos.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.type,
        Habilidade: pokemon.ability,
        Estatísticas: pokemon.stat,
      });
      localStorage.setItem("favorites", JSON.stringify(favoritos));
    }
  };

  // Alterna entre tema claro e escuro e salva no LocalStorage
  const MudTema = () => {
    const novoTema = tema === "light" ? "dark" : "light";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema); // Armazena no LocalStorage
  };

  return (
    <div>
      <h1>POKEDÉX - BUSQUE OS POKÉMONS </h1>
      <div className="Junt">
      <input
        type="text"
        placeholder="Nome ou ID"
        onChange={(e) => setPesquisar(e.target.value)}
      />
      <div className="Flex-Box1">
      <button className="button1" onClick={Busquepok}>
        Buscar
      </button>
      <button className="button1" onClick={MudTema}>
        Mudar para {tema === "light" ? "Modo Escuro" : "Modo Claro"}
      </button>
      </div>
      {pokemon && (
        <div className="Flex-Box">
          <h2>{pokemon.name}</h2>
          {/* <p>{pokemon.types}</p>
          <p>{pokemon.abilities}</p>
          <p>{pokemon.stats}</p> */}
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <button className="button2" onClick={addFavorites}>Favoritar</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;
