import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const URL = "http://localhost:3000/pokemon";

class PokemonIndex extends React.Component {
  state = {
    pokemons: [],
    filteredPokemon: []
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
    })
    .then(this.setState({ pokemons: [...this.state.pokemons, pokemon] }))
  };

  // onSearchChangeHandler = (event) => {
  //   if (this.state.pokemons.map(pokemons => pokemons.name.include(event.input.value))) {
    
  //   }
  // }


  render() {
    const { pokemons } = this.state;
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(() => console.log('Searching...'), 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemons={pokemons} />
        <br />
        <PokemonForm
          postPokemonToServer={this.postPokemonToServer}
          pokemons={pokemons}
        />
      </div>
    );
  }
}

export default PokemonIndex;
