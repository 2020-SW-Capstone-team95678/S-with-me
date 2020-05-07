import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({});

export default class FormProvder extends React.PureComponent {
  static propTypes = {
    validate: PropTypes.func,
  };
  static defaultProps = {
    initValues: {},
    validate: () => ({}),
  };
  static Consumer = Consumer;

  // 생명주기 함수
  // initValues 프로퍼티로 state 동기화
  static getDerivedFromProps({ initValues }) {
    const values = initValues !== prevState.initValues ? initValues : prevState.values;
    return {
      initValues,
      values,
      errors: {},
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.reset = this.reset.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { values, errors } = this.state;
    e.preventDefault();
    if (Object.values(errors).length === 0) {
      this.props.onSubmit(values);
    }
  }

  onChange(name, updatedValue) {
    this.validate(this.state.values);
    this.setState(({ values }) => ({
      values: {
        ...values,
        [name]: updatedValue,
      },
    }));
  }

  reset() {
    this.setState({ values: {} });
  }

  validate(values) {
    const { validate } = this.props;
    if (!validate) {
      return;
    }
    const errors = this.props.validate(values);
    this.setState({ errors });
  }

  render() {
    const { values, errors } = this.state;
    return (
      <Provider value={{ errors, values, onChange: this.onChange, reset: this.reset }}>
        <form onSubmit={this.handleSubmit}>{this.props.children}</form>
      </Provider>
    );
  }
}
