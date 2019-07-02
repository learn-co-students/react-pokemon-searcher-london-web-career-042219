import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = { front: true };

  flip = () => this.setState({ front: !this.state.front });

  renderCardSide = () => {
    const pokemon = this.props.pokemon;
    const hp = pokemon.stats.find(stat => stat.name === "hp").value;

    if (this.state.front) {
      return (
        <div onClick={this.flip}>
          <div className="image">
            <img src={pokemon.sprites.front} alt={pokemon.name} />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div onClick={this.flip}>
          <div className="image">
            <img src={pokemon.sprites.back} alt={pokemon.name} />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      );
    }
  };

  render() {
    return <Card>{this.renderCardSide()}</Card>;
  }
}

export default PokemonCard;
