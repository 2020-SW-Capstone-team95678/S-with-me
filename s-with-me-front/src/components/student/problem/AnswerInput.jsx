import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../common-ui/Input';
import CheckBox from '../../../common-ui/CheckBox';

export default class AnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { optionNum: 1, optionContent: '1번 보기' },
        { optionNum: 2, optionContent: '2번 보기' },
        { optionNum: 3, optionContent: '3번 보기' },
        { optionNum: 4, optionContent: '4번 보기' },
        { optionNum: 5, optionContent: '5번 보기' },
      ],
    };
  }
  static propTypes = {
    isOptional: PropTypes.bool,
  };

  static defaultProps = {
    isOptional: false,
  };

  render() {
    const { isOptional } = this.props;
    if (isOptional) {
      return (
        <div>
          {this.state.options.map((option, i) => (
            <CheckBox label={option.optionNum}>{option.optionContent}</CheckBox>
          ))}
        </div>
      );
    } else {
      return <Input type="text" name="subjectiveAnswer" label="정답을 입력하세요" />;
    }
  }
}
