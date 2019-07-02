import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(resp => resp.json())
      .then(resp => this.setState({ pokemon: resp }));
  }

  handleSearch = (event, { value }) => {
    this.setState({ searchTerm: value });
  };

  addPokemon = pokemon => {
    this.setState({
      pokemon: [...this.state.pokemon, pokemon]
    });
  };

  render() {
    const { pokemon, searchTerm } = this.state;

    const foundPokemon = pokemon.filter(pokemon =>
      pokemon.name.includes(searchTerm)
    );

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearch, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection pokemon={foundPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
