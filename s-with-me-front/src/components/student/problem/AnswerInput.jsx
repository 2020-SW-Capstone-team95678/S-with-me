import React, { PureComponent } from 'react';

import Input from '../../../common-ui/Input';
import CheckBox from '../../../common-ui/CheckBox';
import VerticalList from '../../../common-ui/VerticalList';

export default class AnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { optionNum: 1, optionContent: '1번 보기', isChecked: false },
        { optionNum: 2, optionContent: '2번 보기', isChecked: false },
        { optionNum: 3, optionContent: '3번 보기', isChecked: false },
        { optionNum: 4, optionContent: '4번 보기', isChecked: false },
        { optionNum: 5, optionContent: '5번 보기', isChecked: false },
      ],
      answer: '',
    };
    this.setAnswer = this.setAnswer.bind(this);
  }

  setAnswer(answer) {
    if (this.props.isOptional) {
      const { options } = this.state;
      this.setState({
        answer: answer,
        options: options.map(option =>
          answer === option.optionNum ? { ...option, isChecked: !option.isChecked } : option,
        ),
      });
    } else {
      this.setState({ answer: answer });
      console.log(answer);
    }
  }
  render() {
    const { options } = this.state;
    if (this.props.isOptional) {
      return (
        <VerticalList spacingBetween={1}>
          {options.map(option => (
            <CheckBox
              name="optionInput"
              label={option.optionNum}
              onChange={() => {
                this.setAnswer(option.optionNum);
              }}
              checked={option.isChecked}
            >
              {option.optionContent}
            </CheckBox>
          ))}
        </VerticalList>
      );
    } else {
      return <Input type="text" name="subjectiveAnswer" label="정답을 입력하세요" />;
    }
  }
}
