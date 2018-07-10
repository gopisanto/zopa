import React, { PureComponent } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextInput from './text_input';
import { validate } from '../validations';
import { addTransaction } from '../actions';

class SendMoney extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTextInput = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const {
      name,
      email,
      amountTransferred,
    } = this.props;

    this.props.addTransaction({
      name,
      email,
      amountTransferred,
    }).then(() => this.props.reset());
  }

  renderField(field) {
    return <TextInput field={field} />;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="send-money">
        <form onSubmit={handleSubmit(this.onSubmit)} autoComplete="none">
          <h1>Send money</h1>
          <Field name="name" label="Name" type="text" component={this.renderTextInput} />
          <Field name="email" label="Email address" type="text" component={this.renderTextInput} />
          <Field name="amount" label="Amount" type="currency" component={this.renderTextInput} />
          <input type="submit" value="Send" className="btn-send" />
        </form>
      </div>
    );
  }
}

SendMoney.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  amountTransferred: PropTypes.number,
  reset: PropTypes.func.isRequired,
};

SendMoney.defaultProps = {
  name: '',
  email: '',
  amountTransferred: 0,
};

const selector = formValueSelector('sendMoney');

export default connect(
  state => ({
    name: selector(state, 'name'),
    email: selector(state, 'email'),
    amountTransferred: Number(selector(state, 'amount')),
    transactions: state.ledger.transactions,
  }),
  { addTransaction },
)(reduxForm({
  form: 'sendMoney',
  validate,
})(SendMoney));
