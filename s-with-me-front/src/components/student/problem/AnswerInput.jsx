import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CheckBox from '../../../common-ui/CheckBox';
import Input from '../../../common-ui/Input';

export default class AnswerInput extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    isOptional: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    const { id, isOptional, options } = this.props;
    if (isOptional) {
      return (
        <div>
          <CheckBox label="1">{options[0]}</CheckBox>
          <CheckBox label="2">{options[1]}</CheckBox>
          <CheckBox label="3">{options[2]}</CheckBox>
          <CheckBox label="4">{options[3]}</CheckBox>
          <CheckBox label="5">{options[4]}</CheckBox>
        </div>
      );
    } else {
      return <Input type="text" name="subjectiveAnswer" label="정답을 입력하세요" />;
    }
  }
}
