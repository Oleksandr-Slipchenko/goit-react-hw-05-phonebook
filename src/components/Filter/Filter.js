import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ filter, onChange }) => {
  return (
    <div className={s.filter}>
      <input
        className={s.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
