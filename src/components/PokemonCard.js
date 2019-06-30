import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    frontPic: true
  };

  showHP = () => {
    return this.props.pokemon.stats.find(x => x.name === "hp").value;
  };

  handleClick = () => {
    this.setState({
      frontPic: !this.state.frontPic
    });
  };

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
            <img
              alt="oh no!"
              src={
                this.state.frontPic
                  ? this.props.pokemon.sprites.front
                  : this.props.pokemon.sprites.back
              }
            />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.showHP()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
