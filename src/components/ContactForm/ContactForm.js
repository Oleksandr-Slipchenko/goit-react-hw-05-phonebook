import { Component } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  number: '',
  name: '',
};

class ContactForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCheckUnique: PropTypes.func.isRequired,
  };

  state = INITIAL_STATE;

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isValidateForm = this.validateForm();
    if (!isValidateForm) return;
    onAdd({ id: uuid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !number) {
      alert('Some field is empty');
      return false;
    }
    return onCheckUnique(name);
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>
            <b>Name</b>
          </p>
          <br />
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          <p>
            <b>Number</b>
          </p>
          <br />
          <input
            type="tel"
            value={number}
            name="number"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
