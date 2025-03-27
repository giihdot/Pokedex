import { useState, useEffect } from "react"; 
import "./Pokedex.css"; 

function Pokedex() {
  // Definição dos estados para armazenar os dados necessários
  const [pokemon, setPokemon] = useState(null); 
  const [Pesquisar, setPesquisar] = useState(""); 
  const [Tema, setTema] = useState(localStorage.getItem("theme") || "light"); 
  // Estado para o tema, busca o valor armazenado no LocalStorage, se existir


  useEffect(() => {
    document.body.classList.remove("light", "dark"); // Remove as classes antigas de tema
    document.body.classList.add(Tema); // Adiciona a classe do tema atual (light ou dark)
  }, [Tema]);


  const fetchPokemon = async () => {
    if (!Pesquisar) return; // Se o campo de busca estiver vazio, não faz nada
    try {
      // Realiza a requisição para a API de Pokémon usando o nome ou ID fornecido
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Pesquisar.toLowerCase()}`
      );
      const data = await response.json(); // Converte a resposta para JSON
      setPokemon(data); // Atualiza o estado com os dados do Pokémon encontrado
    } catch {
      setPokemon(null); 
    }
  };

  function addFavorites() {
    if (!pokemon) return; // Se não houver Pokémon carregado, não faz nada
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // Recupera a lista de favoritos do LocalStorage ou cria uma lista vazia
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      // Verifica se o Pokémon já está nos favoritos (com base no 'id')
      favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default, // Adiciona a imagem do Pokémon
        type: pokemon.types.map((t) => t.type.name).join(", "), // Adiciona os tipos do Pokémon
        ability: pokemon.abilities.map((a) => a.ability.name).join(", "), // Adiciona as habilidades do Pokémon
        stats: pokemon.stats
          .map((s) => `${s.stat.name}: ${s.base_stat}`)
          .join(", "), // Adiciona as estatísticas do Pokémon
      });
      localStorage.setItem("favorites", JSON.stringify(favorites)); // Salva a lista de favoritos atualizada no LocalStorage
    }
  };

  function Buscar_Tema() {
    const NovoTema = Tema === "light" ? "dark" : "light"; // Alterna entre os temas "light" e "dark"
    setTema(NovoTema); // Atualiza o estado do tema
    localStorage.setItem("Tema", NovoTema); 
  };

  return (
    <div>
      <h1> POKEDÉX </h1>
      <div className="Junt"> 
        <input
          type="text"
          placeholder="Nome ou ID"
          onChange={(e) => setPesquisar(e.target.value)} // Atualiza o termo de busca no estado 'Pesquisar'
        />
        <div className="Flex-Box1"> 
          <button onClick={fetchPokemon}> 
            Buscar
          </button>
          <button onClick={Buscar_Tema}> 
            Mudar para {Tema === "light" ? "Modo Escuro" : "Modo Claro"} {/* Texto dinâmico que indica qual tema será aplicado */}
          </button>
        </div>
        {pokemon && ( // Verifica se há dados do Pokémon carregados
          <div className="pokemon-card"> {/* Exibe os detalhes do Pokémon encontrado */}
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
