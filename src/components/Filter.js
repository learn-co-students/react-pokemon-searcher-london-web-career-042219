import React, { Component } from "react";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  handleClick = () => {
    if (!this.state.clicked) {
      this.filterPokemon();
      this.setState({
        clicked: !this.state.clicked
      });
    } else {
      this.props.getPokemonFromServer();
      this.setState({
        clicked: !this.state.clicked
      });
    }
  };

  filterPokemon = () => {
    let filteredPokemon = this.props.pokemons.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.props.updatePokemon(filteredPokemon);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.clicked ? "Filter Off" : "Filter By Name"}
        </button>
      </div>
    );
  }
}
export default Filter;
