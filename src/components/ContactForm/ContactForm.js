import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import fadeAlert from '../../fadeModules/fadeContactFormAlert.module.css';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  number: '',
  name: '',
  alert: false,
  message: '',
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
      this.setState({ alert: true, message: 'Some field is empty' });
      setTimeout(() => this.setState({ alert: false, message: '' }), 2000);
      return;
      // alert('Some field is empty');
      // return false;
    }
    return onCheckUnique(name);
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { name, number, alert, message } = this.state;
    return (
      <>
        <CSSTransition
          in={alert}
          timeout={250}
          classNames={fadeAlert}
          unmountOnExit
        >
          <p className={fadeAlert.alert}>{message}</p>
        </CSSTransition>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <section className={s.sectionName}>
            <label className={s.label}>
              <p className={s.inputTitle}>Name</p>
              <input
                className={s.input}
                type="text"
                value={name}
                name="name"
                onChange={this.handleInputChange}
              />
            </label>
          </section>
          <section className={s.sectionNumber}>
            <label className={s.label}>
              <p className={s.inputTitle}>Number</p>
              <input
                className={s.input}
                type="tel"
                value={number}
                name="number"
                onChange={this.handleInputChange}
              />
            </label>
          </section>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
