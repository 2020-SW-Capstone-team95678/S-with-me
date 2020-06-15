import React, { PureComponent } from 'react';

import CheckBox from '../../../common-ui/CheckBox';
import VerticalList from '../../../common-ui/VerticalList';

import { delimeters } from '../../../constants/delimeters';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default class NewAnswerInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      optionlabels: ['①', '②', '③', '④', '⑤'],
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
    const { options, optionlabels } = this.state;
    const { optionContents, isMath } = this.props;
    if (this.props.isOptional) {
      return (
        <VerticalList spacingBetween={1}>
          {options.map((option, index) => (
            <CheckBox
              key={index}
              name="optionInput"
              label={optionlabels[index]}
              onChange={() => {
                this.setCheckState(option.optionNum);
                this.handleOptionalAnswer(option.optionNum);
              }}
              checked={option.isChecked}
            >
              {isMath ? (
                <Latex delimiters={delimeters}>
                  {optionContents[index].replaceAll('\\\\', '\\').replace(/"/g, '')}
                </Latex>
              ) : (
                optionContents[index]
              )}
            </CheckBox>
          ))}
        </VerticalList>
      );
    } else {
      return <input type="text" name="subjectiveAnswer" onChange={this.handleSubjectiveAnswer} />;
    }
  }
}
