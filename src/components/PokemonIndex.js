import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import Filter from "./Filter";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: []
    };
  }

  getPokemonFromServer = () => {
    return fetch("http://localhost:3000/pokemon").then(response =>
      response.json().then(data => this.setState({ pokemon: data }))
    );
  };

  componentDidMount() {
    this.getPokemonFromServer();
  }

  updatePokemonState = pokemon => {
    this.setState({ pokemon: [...this.state.pokemon, pokemon] });
  };

  updatePokemon = filteredPokemon => {
    this.setState({
      pokemon: filteredPokemon
    });
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(() => console.log("🤔"), 500)}
          showNoResults={false}
        />
        <Filter
          getPokemonFromServer={this.getPokemonFromServer}
          updatePokemon={this.updatePokemon}
          pokemons={this.state.pokemon}
        />
        <br />
        <PokemonCollection
          getPokemonFromServer={this.getPokemonFromServer}
          pokemons={this.state.pokemon}
        />
        <br />
        <PokemonForm updatePokemonState={this.updatePokemonState} />
      </div>
    );
  }
}

export default PokemonPage;
