import { useState, useEffect } from "react"; 
import "./Pokedex.css"; 

function Pokedex() {
  // Definição dos estados para armazenar os dados necessários
  const [pokemon, setPokemon] = useState(null); // Armazena os dados do Pokémon encontrado
  const [Pesquisar, setPesquisar] = useState(""); // Armazena o valor digitado na barra de pesquisa
  const [Tema, setTema] = useState(localStorage.getItem("theme") || "light"); // Armazena o tema atual, se não houver salva "light" por padrão

  // useEffect para alterar o tema da página (modo claro ou escuro)
  useEffect(() => {
    // Remove as classes de tema antigos e aplica o novo
    document.body.classList.remove("light", "dark"); 
    document.body.classList.add(Tema); 
  }, [Tema]); // Dependência do estado 'Tema', para garantir que a troca de tema ocorra quando 'Tema' mudar

  // Função que busca o Pokémon na API quando o botão "Buscar" é clicado
  const fetchPokemon = async () => {
    if (!Pesquisar) {
      // Se o campo de pesquisa estiver vazio, exibe um alerta
      alert("Por favor, digite o nome ou ID do Pokémon para buscar!");
      return;
    }

    try {
      // Faz a requisição para a API de Pokémon usando o nome ou ID fornecido
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${Pesquisar.toLowerCase()}`
      );

      if (!response.ok) {
        // Se a resposta da API não for bem-sucedida (erro, Pokémon não encontrado), exibe um alerta
        alert("Pokémon não encontrado. Verifique o nome ou ID.");
        setPokemon(null); // Limpa o estado do Pokémon
        return;
      }

      // Converte a resposta da API para JSON
      const data = await response.json(); 
      // Atualiza o estado com os dados do Pokémon encontrado
      setPokemon(data); 
    } catch (error) {
      // Se ocorrer um erro durante a requisição, exibe um alerta
      alert("Erro ao buscar o Pokémon. Tente novamente.");
      setPokemon(null); // Limpa o estado do Pokémon
    }
  };

  function addFavorites() {
    if (!pokemon) return; // Se não houver um Pokémon, não faz nada
    // Recupera os favoritos salvos no localStorage ou cria um array vazio se não houver favoritos
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Verifica se o Pokémon já está na lista de favoritos
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      // Se o Pokémon não estiver nos favoritos, o adiciona
      favorites.push({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default, 
        type: pokemon.types.map((t) => t.type.name).join(", "), 
        ability: pokemon.abilities.map((a) => a.ability.name).join(", ")
      });
      localStorage.setItem("favorites", JSON.stringify(favorites)); //transforma a lista em texto
    }
  };

  function Buscar_Tema() {
    const NovoTema = Tema === "light" ? "dark" : "light"; 
    setTema(NovoTema); 
    localStorage.setItem("Tema", NovoTema); 
  };

  return (
    <div>
      <h1> POKEDÉX </h1> 
      <div className="Junt"> 
        <input
          type="text" // Campo de entrada para o nome ou ID do Pokémon
          placeholder="Nome ou ID"
          onChange={(e) => setPesquisar(e.target.value)} // Atualiza o estado 'Pesquisar' quando o usuário digita
        />
        <div className="Flex-Box1"> 
          <button onClick={fetchPokemon}> 
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
