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
      problem: {},
      myAnswer: null,
      solutionType: null,
      textSolution: null,
      imageSolution: null,
      linkSolutionId: null,
    };
  }
  componentDidMount() {
    Api.get('/student/library/my-book/my-problem/problem-id', {
      params: { myProblemId: this.props.myProblemId },
    }).then(({ data }) =>
      this.setState({
        problem: data.problem,
        myAnswer: data.myAnswer,
        solutionType: data.solutionType,
        textSolution: data.textSolution,
        imageSolution: data.imageSolution,
      }),
    );
  }

  render() {
    const { myAnswer, solutionType, textSolution, imageSolution, problem } = this.state;
    const { problemNumber, content, isOptional, answer, solution } = problem;
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
            <br />
            <div>
              <Text>정답: {answer}</Text>
              <br />
              <Text>해설: {solution}</Text>
            </div>
            <div>---------------------------------</div>
            <div>
              <Text>나의 정답: {myAnswer}</Text>
              <br />
              <Text>나의 풀이↓</Text> <br />
              {solutionType === 'text' ? (
                <Text>{textSolution}</Text>
              ) : solutionType === 'img' ? (
                <img src={imageSolution} alt="나의 이미지 풀이" />
              ) : (
                <Text>링크 풀이 입니다.</Text>
              )}
            </div>
            <Button onPress={closeModal}>닫기</Button>
          </Spacing>
        )}
      </Modal>
    );
  }
}
