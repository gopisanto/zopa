import {
  validateName,
  validateEmail,
  validate,
  ONLY_ALPHABETS,
  INVALID_EMAIL,
  POSITIVE_AMOUNT_REQUIRED,
  REQUIRED_FIELD,
  INSUFFICIENT_FUNDS
} from '.';

describe('validateName', () => {
  test('returns true if valid name is passed', () => {
    const name1 = 'Santosh Kumar';
    const name2 = 'Santosh Kumar G';

    expect(validateName(name1)).toBeTruthy();
    expect(validateName(name2)).toBeTruthy();
  });

  test('returns false if invalid name is passed', () => {
    const name1 = 'Santosh-Kumar';
    const name2 = 'Santosh Kumar. G';
    const name3 = 'xyz#$%';

    expect(validateName(name1)).toBeFalsy();
    expect(validateName(name2)).toBeFalsy();
    expect(validateName(name2)).toBeFalsy();
  });
});

describe('validateEmail', () => {
  test('returns true if valid email id is passed', () => {
    const email1 = 'santosh.gopisetty@gmail.com';
    const email2 = 'santosk-kumar.gopisetty@domain.com';

    expect(validateEmail(email1)).toBeTruthy();
    expect(validateEmail(email2)).toBeTruthy();
  });

  test('returns false if invalid email id is passed', () => {
    const email1 = 'santosh.gopisetty@gmail';
    const email2 = 'santosk-kumar.gopisetty';

    expect(validateEmail(email1)).not.toBeTruthy();
    expect(validateEmail(email2)).not.toBeTruthy();
  });
});

describe('validate', () => {
  test('returns empty object when name, email and amount are valid values', () => {
    const values = {
      name: 'Santosh Kumar',
      email: 'santosh.gopisetty@gmail.com',
      amount: 5000
    };
    const account = { totalLeft: 30000 };

    expect(validate(values, account)).toEqual({});
  });

  test('return object with field name and error message for whichever field value is invalid', () => {
    const values1 = {
      name: 'Santosh.Gopisetty', // this is wrong
      email: 'gopi.santo@gmail.com',
      amount: 20000
    };
    const values2 = {
      name: 'Santosh Kumar',
      email: 'santosh.gopisetty', // this is wrong
      amount: 6000
    };
    const values3 = {
      name: 'Santosh Kumar',
      email: 'santosh.gopisetty@gmail.com',
      amount: -100 // this is wrong
    };
    const account = { totalLeft: 30000 };

    expect(validate(values1, account)).toEqual({name: ONLY_ALPHABETS});
    expect(validate(values2, account)).toEqual({ email: INVALID_EMAIL});
    expect(validate(values3, account)).toEqual({ amount: POSITIVE_AMOUNT_REQUIRED});
  });

  test('return object with field name and error message for whichever field value is empty', () => {
    const values1 = {
      name: 'Gopisetty',
      email: 'gopi.santo@gmail.com'
    };
    const values2 = {
      name: 'Santosh Kumar',
      amount: 20000
    };
    const values3 = {
      name: 'Santosh Kumar',
      email: 'santosh.gopisetty@gmail.com',
      amount: 40000
    };
    const account = { totalLeft: 30000 };

    expect(validate(values1, account)).toEqual({ amount: REQUIRED_FIELD});
    expect(validate(values2, account)).toEqual({email: REQUIRED_FIELD});
    expect(validate(values3, account)).toEqual({amount: INSUFFICIENT_FUNDS});
  });
});
