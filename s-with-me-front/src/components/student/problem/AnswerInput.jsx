import React, { PureComponent } from 'react';

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
    };
    this.setCheckState = this.setCheckState.bind(this);
    this.handleOptionalAnswer = this.handleOptionalAnswer.bind(this);
    this.handleSubjectiveAnswer = this.handleSubjectiveAnswer.bind(this);
  }

  setCheckState(answer) {
    const { options } = this.state;
    this.setState({
      options: options.map((option) =>
        answer === option.optionNum ? { ...option, isChecked: !option.isChecked } : option,
      ),
    });
  }

  handleOptionalAnswer(optionNum) {
    const { id, setMyAnswer } = this.props;
    const { options } = this.state;
    if (options[optionNum - 1].isChecked) setMyAnswer(id, null);
    else setMyAnswer(id, optionNum);
  }

  handleSubjectiveAnswer(e) {
    const { id, setMyAnswer } = this.props;
    e.preventDefault();
    setMyAnswer(id, e.target.value);
  }

  render() {
    const { options } = this.state;
    if (this.props.isOptional) {
      return (
        <VerticalList spacingBetween={1}>
          {options.map((option) => (
            <CheckBox
              name="optionInput"
              label={option.optionNum}
              onChange={() => {
                this.setCheckState(option.optionNum);
                this.handleOptionalAnswer(option.optionNum);
              }}
              checked={option.isChecked}
            >
              {option.optionContent}
            </CheckBox>
          ))}
        </VerticalList>
      );
    } else {
      return <input type="text" name="subjectiveAnswer" onChange={this.handleSubjectiveAnswer} />;
    }
  }
}
