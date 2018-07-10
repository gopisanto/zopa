import React from 'react';
import PropTypes from 'prop-types';

import { COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS } from '../constants';

const Transaction = ({ transaction }) => {
  const { name, email, amountTransferred } = transaction;

  return (
    <div className="transaction">
      <div className="person">
        <label className="name">{name}</label>
        <label className="email">{email}</label>
      </div>
      <div className="amount">
        <label>{amountTransferred.toLocaleString(
          COUNTRY_CURRENCY_CODE,
          CURRENCY_FORMAT_OPTIONS,
          )}
        </label>
      </div>
    </div>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default Transaction;
