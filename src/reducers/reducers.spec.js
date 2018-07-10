import { INITIAL_STATE, transactions as reducer } from '.';
import { ADD_TRANSACTION } from '../actions';

describe('transactions reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('should add transaction and update totalLeft amount', () => {
    const transaction = {
      name: 'santosh',
      email: 'santosh.gopisetty@gmail.com',
      amountTransferred: 1000
    };
    const UPDATED_STATE = INITIAL_STATE.updateIn(
      ['transactions'],
      trans => [...trans, transaction]
    )
    .setIn(
      ['totalLeft'],
      INITIAL_STATE.totalLeft - Number(transaction.amountTransferred)
    );

    expect(reducer(INITIAL_STATE, {
      type: ADD_TRANSACTION,
      payload: transaction
    })).toEqual(UPDATED_STATE);
  });
});
