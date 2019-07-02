import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    clicked: false
  };
  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    let { name, clicked } = this.props.pokemon;
    //hp needs [5]
    let { value } = this.props.pokemon.stats;
    //image
    let { front, back } = this.props.pokemon.sprites;

    return (
      <Card>
        <div onClick={this.handleClick}>
          {this.state.clicked === false ? (
            <div>
              <div className="image">
                <img alt="oh no!" src={front} />
              </div>
              <div className="content">
                <div className="header">{name}</div>
              </div>
              <div className="extra content">
                <span>
                  <i className="icon heartbeat red" />
                  {value}hp
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="image">
                <img alt="oh no!" src={back} />
              </div>
              <div className="content">
                <div className="header">{name}</div>
              </div>
              <div className="extra content">
                <span>
                  <i className="icon heartbeat red" />
                  {value}hp
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
