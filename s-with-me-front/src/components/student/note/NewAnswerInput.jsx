import React, { PureComponent } from 'react';

import CheckBox from '../../../common-ui/CheckBox';
import VerticalList from '../../../common-ui/VerticalList';

export default class NewAnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { optionNum: 1, isChecked: false },
        { optionNum: 2, isChecked: false },
        { optionNum: 3, isChecked: false },
        { optionNum: 4, isChecked: false },
        { optionNum: 5, isChecked: false },
      ],
    };
    this.setCheckState = this.setCheckState.bind(this);
    this.handleOptionalAnswer = this.handleOptionalAnswer.bind(this);
    this.handleSubjectiveAnswer = this.handleSubjectiveAnswer.bind(this);
  }

  setCheckState(answer) {
    const { options } = this.state;
    this.setState({
      options: options.map(option =>
        answer === option.optionNum ? { ...option, isChecked: !option.isChecked } : option,
      ),
    });
  }

  handleOptionalAnswer(optionNum) {
    const { id, setMyNewAnswer } = this.props;
    const { options } = this.state;
    if (options[optionNum - 1].isChecked) setMyNewAnswer(id, null);
    else setMyNewAnswer(id, optionNum);
  }

  handleSubjectiveAnswer(e) {
    const { id, setMyNewAnswer } = this.props;
    e.preventDefault();
    setMyNewAnswer(id, e.target.value);
  }

  render() {
    const { options } = this.state;
    const { optionContents } = this.props;
    if (this.props.isOptional) {
      return (
        <VerticalList spacingBetween={1}>
          {options.map((option, index) => (
            <CheckBox
              name="optionInput"
              label={option.optionNum}
              onChange={() => {
                this.setCheckState(option.optionNum);
                this.handleOptionalAnswer(option.optionNum);
              }}
              checked={option.isChecked}
            >
              {optionContents[index]}
            </CheckBox>
          ))}
        </VerticalList>
      );
    } else {
      return <input type="text" name="subjectiveAnswer" onChange={this.handleSubjectiveAnswer} />;
    }
  }
}
