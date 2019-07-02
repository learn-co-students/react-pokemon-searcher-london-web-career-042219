import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  url = "http://localhost:4000/pokemon";

  state = {
    pokemons: [],
    types: [],
    filter: ""
  };

  componentDidMount() {
    this.fetchPokemonFromDb();
  }

  fetchPokemonFromDb = () => {
    fetch(this.url)
      .then(resp => resp.json())
      .then(this.parsePokemonIntoState);
  };

  parsePokemonIntoState = data => {
    let types = [];
    data.forEach(pokemon =>
      pokemon.types.forEach(type =>
        types.includes(type) ? null : types.push(type)
      )
    );
    this.setState({ pokemons: data, types: types });
  };

  setSearchTerm = (event, { value }) => {
    this.setState({ filter: value });
  };

  postPokemonToDb = newPokemon => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        newPokemon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(this.url, options);
  };

  filterPokemon = () => {
    if (this.state.filter !== "") {
      return this.state.pokemons.filter(pokemon =>
        pokemon.name.includes(this.state.filter)
      );
    } else {
      return this.state.pokemons;
    }
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(this.setSearchTerm, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemons={this.filterPokemon()} />
        <br />
        <PokemonForm submitNewPokemon={this.postPokemonToDb} />
      </div>
    );
  }
}

export default PokemonPage;
