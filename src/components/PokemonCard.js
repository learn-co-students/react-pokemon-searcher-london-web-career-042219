import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    clicked: false
  }
  
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  

  render() {
    const { pokemon } = this.props
    const { clicked } = this.state

    return (
      <Card onClick={this.handleClick} >
        <div>
          <div className="image">
            <img alt="oh no!" src={clicked ? pokemon.sprites.back : pokemon.sprites.front} />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              { pokemon.stats.name === "hp" ? pokemon.stats.value : Math.floor(Math.random() * (100 - 25)) + 25 } hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
