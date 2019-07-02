import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  state = {
    name: "",
    hp: "",
    frontUrl: "",
    backUrl: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    const pokemon = {
      name: event.target[0].value,
      stats: [
        {
          value: event.target[1].value,
          name: "hp"
        }
      ],
      sprites: {
        front: event.target[2].value,
        back: event.target[3].value
      }
    };
    this.createPokemon(pokemon);
    this.props.addPokemon(pokemon);
    event.target.reset();
  };

  createPokemon = pokemon => {
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(pokemon)
    });
  };

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="frontUrl"
            />
            <Form.Input
              fluid
              label="Back Image URL"
              placeholder="url"
              name="backUrl"
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
