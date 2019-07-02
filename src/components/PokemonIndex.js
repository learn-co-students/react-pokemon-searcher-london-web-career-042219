import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const URL = "http://localhost:3000/pokemon";

class PokemonIndex extends React.Component {
  state = {
    pokemons: [],
    searchTerm: ""
  };

  fetchPokemons = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(pokemonData => {
        this.setState({ pokemons: pokemonData });
      });
  };

  componentDidMount() {
    this.fetchPokemons();
  }

  postPokemonToServer = pokemon => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon)
    }).then(this.setState({ pokemons: [...this.state.pokemons, pokemon] }));
  };

  onSearchChangeHandler = (event, { value }) => {
    this.setState({ searchTerm: value });
  };

  render() {
    const { pokemons } = this.state;
    const filteredPokemon = this.state.pokemons.filter(pokemon =>
      pokemon.name.includes(this.state.searchTerm)
    );
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm postPokemonToServer={this.postPokemonToServer} />
        <br />
        <Search
          onSearchChange={_.debounce(this.onSearchChangeHandler, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemons={filteredPokemon} />
        <br />
      </div>
    );
  }
}

export default PokemonIndex;
