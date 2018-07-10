export const REQUIRED_FIELD = 'This field is required.';
export const ONLY_ALPHABETS = 'Only alphabets, no numbers or special characters allowed.';
export const INVALID_EMAIL = 'Invalid Email ID.';
export const AMOUNT_REQUIRED = 'Please enter amount to transfer';
export const POSITIVE_AMOUNT_REQUIRED = 'Enter proper amount to transfer';
export const INSUFFICIENT_FUNDS = 'Insufficient funds.';

export const validateName = name => /^[a-zA-Z ]+$/.test(name);

export const validateEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const validate = (values, { totalLeft }) => {
  const errors = {};
  const { name, email, amount } = values;

  if (!name) {
    errors.name = REQUIRED_FIELD;
  } else if (!validateName(name)) {
    errors.name = ONLY_ALPHABETS;
  }

  if (!email) {
    errors.email = REQUIRED_FIELD;
  } else if (!validateEmail(email)) {
    errors.email = INVALID_EMAIL;
  }

  if (amount !== 0 && !amount) {
    errors.amount = REQUIRED_FIELD;
  } else if (!Number.isFinite(Number(amount))) {
    errors.amount = POSITIVE_AMOUNT_REQUIRED;
  } else if (amount === 0) {
    errors.amount = AMOUNT_REQUIRED;
  } else if (amount < 0) {
    errors.amount = POSITIVE_AMOUNT_REQUIRED;
  } else if (totalLeft - amount < 0) {
    errors.amount = INSUFFICIENT_FUNDS;
  }

  return errors;
};
