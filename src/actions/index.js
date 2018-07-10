// import axios from 'axios';

export const ADD_TRANSACTION = 'src.actions.addTransaction';

export const addTransaction = payload => async (dispatch, getState) => {
  dispatch({
    type: ADD_TRANSACTION,
    payload,
  });
};
