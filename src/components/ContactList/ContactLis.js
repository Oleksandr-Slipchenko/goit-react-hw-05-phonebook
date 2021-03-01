import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import fadeStyles from '../../fadeModules/fadeContactList.module.css';
import ContactListItem from './ContactListItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ContactsList = ({ contacts, onRemove }) => {
  // if (contacts.length === 0) return null;
  return (
    <TransitionGroup component="ul" className={s.contactList}>
      {contacts.map(contact => (
        <CSSTransition key={contact.id} timeout={250} classNames={fadeStyles}>
          <ContactListItem {...contact} onRemove={onRemove} />
        </CSSTransition>
      ))}
    </TransitionGroup>

    // <ul className={s.contactList}>
    //   {contacts.map(contact => (
    //     <ContactListItem key={contact.id} {...contact} onRemove={onRemove} />
    //   ))}
    // </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ContactsList;
