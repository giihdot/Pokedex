// src/Pages/Home.js
import { useState, useEffect } from "react";
// import "./Pokede.css"; // Importa o CSS

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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pesquisar.toLowerCase()}`);
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
      favoritos.push({ id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default, type: pokemon.type, Habilidade: pokemon.ability, Estatísticas: pokemon.stat });
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
      <h1>Pokédex</h1>
      <input type="text" placeholder="Nome ou ID" onChange={(e) => setPesquisar(e.target.value)} />
      <button onClick={Busquepok}>Buscar</button>
      <button onClick={MudTema}>
        Mudar para {tema === "light" ? "Modo Escuro" : "Modo Claro"}
      </button>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <button onClick={addFavorites}>Favoritar</button>
        </div>
      )}
    </div>
  );
}

export default Home;