import { useState, useEffect } from "react";
import "./Pokedex.css"; // Importa o CSS

function Pokedex() {
  const [pokemon, setPokemon] = useState(null); // Estado para armazenar os dados do Pokémon
  const [Pesquisar, setPesquisar] = useState(""); // Estado para armazenar o termo de busca
  const [Tema, setTema] = useState(localStorage.getItem("theme") || "light"); // Estado para o tema

  // Aplica o tema ao carregar a página
  useEffect(() => {
    document.body.classList.remove("light", "dark"); // Remove classes antigas
    document.body.classList.add(Tema); // Adiciona a classe do tema atual
  }, [Tema]);

  // Função para buscar o Pokémon na API
  const fetchPokemon = async () => {
    if (!Pesquisar) return; // Se a busca estiver vazia, não faz nada
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Pesquisar.toLowerCase()}`
      );
      const data = await response.json();
      setPokemon(data); // Atualiza o estado com os dados do Pokémon
    } catch {
      setPokemon(null); // Se houver erro, reseta o estado
    }
  };

  // Adiciona Pokémon aos favoritos no LocalStorage
  const addFavorites = () => {
    if (!pokemon) return; // Se não houver Pokémon carregado, sai da função
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Recupera favoritos salvos
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      // Verifica se já está nos favoritos
      favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        type: pokemon.types.map((t) => t.type.name).join(", "), // Pega todos os tipos
        ability: pokemon.abilities.map((a) => a.ability.name).join(", "), // Pega todas as habilidades
        stats: pokemon.stats
          .map((s) => `${s.stat.name}: ${s.base_stat}`)
          .join(", "), // Pega todas as estatísticas
      });
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Salva no LocalStorage
    }
  };

  // Alterna entre modo claro e escuro e salva no LocalStorage
  const Buscar_Tema = () => {
    const NovoTema = Tema === "light" ? "dark" : "light";
    setTema(NovoTema);
    localStorage.setItem("Tema", NovoTema); // Armazena no LocalStorage
  };

  return (
    <div>
      <h1> POKEDÉX </h1>
      <div className="Junt">
        <input
          type="text"
          placeholder="Nome ou ID"
          onChange={(e) => setPesquisar(e.target.value)}
        />
        <div className="Flex-Box1">
          <button  onClick={fetchPokemon}>
            Buscar
          </button>
          <button onClick={Buscar_Tema}>
            Mudar para {Tema === "light" ? "Modo Escuro" : "Modo Claro"}
          </button>
        </div>
        {pokemon && (
          <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>
              <strong>Tipo:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Habilidades:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <p>
              <strong>Estatísticas:</strong>{" "}
              {pokemon.stats
                .map((s) => `${s.stat.name}: ${s.base_stat}`)
                .join(", ")}
            </p>
            <button className="button" onClick={addFavorites}>
              Favoritar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
