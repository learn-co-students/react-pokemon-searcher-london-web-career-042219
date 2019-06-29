import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: true
    };
  }
  // What the F**k?!
  showStats = () => {
    return this.props.pokemon.stats.find(x => x.name === "hp").value;
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  handleDeleteClick = event => {
    this.deleteFromServer().then(this.props.getPokemonFromServer);
  };

  deleteFromServer = () => {
    return fetch(`http://localhost:3000/pokemon/${this.props.pokemon.id}`, {
      method: "DELETE"
    });
  };
  render() {
    return (
      <Card>
        <div onClick={this.handleClick}>
          <button className="delete" onClick={this.handleDeleteClick}>
            x
          </button>
          <div className="image">
            <img
              src={
                this.state.clicked
                  ? this.props.pokemon.sprites.front
                  : this.props.pokemon.sprites.back
              }
              alt="oh no!"
            />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.showStats()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
