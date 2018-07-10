import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AccountChart from './account_chart';
import Transaction from './transaction';
import { COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS } from '../constants';

const renderTransaction = (transaction, index) => (
  <Transaction transaction={transaction} key={index} />
);

const Transactions = ({ transactions, totalLeft, balance }) => (
  <div className="transactions">
    <h1>My account</h1>
    <div className="overview">
      <span>
        <label>{(balance - totalLeft).toLocaleString(COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS)}</label>
        <label>total sent</label>
      </span>
      <AccountChart totalSent={balance - totalLeft} totalLeft={totalLeft} />
      <span>
        <label>{totalLeft.toLocaleString(COUNTRY_CURRENCY_CODE, CURRENCY_FORMAT_OPTIONS)}</label>
        <label>left available</label>
      </span>
    </div>
    <div className="detail">
      <h3>Transactions</h3>
      {
        transactions && transactions.length > 0
          ? transactions.map(renderTransaction)
          : <label className="lbl-no-transactions">No transactions.</label>
      }
    </div>
  </div>
);

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object),
  totalLeft: PropTypes.number,
  balance: PropTypes.number,
};

Transactions.defaultProps = {
  transactions: [],
  totalLeft: 0,
  balance: 0,
};

export default connect(state => ({
  transactions: state.ledger.transactions,
  totalLeft: state.ledger.totalLeft,
  balance: state.ledger.balance,
}))(Transactions);
