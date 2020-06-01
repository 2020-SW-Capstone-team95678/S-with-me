import React, { PureComponent } from 'react';

import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';
import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Api from '../../../Api';

export default class ProblemPreviewPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      problemNumber: null,
      content: null,
      isOptional: false,
      answer: null,
      solution: null,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      option5: null,
    };
  }
  componentDidMount() {
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: this.props.problemId },
    }).then(({ data }) =>
      this.setState({
        problemNumber: data.problemNumber,
        content: data.content,
        isOptional: data.isOptional,
        answer: data.answer,
        solution: data.solution,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        option5: data.option5,
      }),
    );
  }

  render() {
    const { problemNumber, content, isOptional, answer, solution } = this.state;
    let optionContents = [];
    let numbers = ['①', '②', '③', '④', '⑤'];
    if (isOptional) {
      optionContents.push(this.state.option1);
      optionContents.push(this.state.option2);
      optionContents.push(this.state.option3);
      optionContents.push(this.state.option4);
      optionContents.push(this.state.option5);
    }
    return (
      <Modal>
        {({ closeModal }) => (
          <Spacing horizontal={4} vertial={8}>
            <Text large>
              {problemNumber}.{content}
            </Text>
            {isOptional ? (
              <VerticalList spacingBetween={1}>
                {optionContents.map((option, index) => (
                  <Text key={index}>
                    {numbers[index]} : {option}
                  </Text>
                ))}
              </VerticalList>
            ) : null}
            <div>
              <Text>정답: {answer}</Text>
              <br />
              <Text>해설: {solution}</Text>
            </div>
            <Button onPress={closeModal}>닫기</Button>
          </Spacing>
        )}
      </Modal>
    );
  }
}
