import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({ field }) => {
  const {
    meta: {
      touched,
      error,
      active,
    },
    name,
    label,
    type,
    input,
  } = field;

  const inputClassNames = classnames('ti-field', { err: touched && error && !active, currency: type === 'currency' });

  return (
    <div className="ti">
      <label htmlFor={name} className="ti-lbl">{label}</label>
      <div>
        {type === 'currency' && <span>£</span>}
        <input type={type} name={name} {...input} className={inputClassNames} autoComplete="none" />
      </div>
      {touched && error && !active && <span className="err-msg">{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  field: PropTypes.object.isRequired,
};

export default TextInput;
