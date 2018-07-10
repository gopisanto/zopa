import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Immutable from 'seamless-immutable';

import { ADD_TRANSACTION } from '../actions';

export const INITIAL_STATE = Immutable({
  transactions: [],
  balance: 100000,
  totalLeft: 100000,
});

export const transactions = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  if (type === ADD_TRANSACTION) {
    return state.updateIn(
      ['transactions'],
      trans => [...trans, payload],
    )
      .setIn(
        ['totalLeft'],
        state.totalLeft - Number(payload.amountTransferred),
      );
  }

  return state;
};

export default combineReducers({
  ledger: transactions,
  form: formReducer,
});
