import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    findPokemon: ""
  };

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(response => response.json())
      .then(data => this.setState({ pokemons: data }));
  }

  handleSearch = (e, { value }) => {
    this.setState({ findPokemon: value });
  };

  addPokemon = pokemon => {
    this.setState({ pokemons: [...this.state.pokemons, pokemon] });
  };

  render() {
    const foundPokemon = this.state.pokemons.filter(p =>
      p.name.includes(this.state.findPokemon)
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
        <PokemonCollection pokemons={foundPokemon} />
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
