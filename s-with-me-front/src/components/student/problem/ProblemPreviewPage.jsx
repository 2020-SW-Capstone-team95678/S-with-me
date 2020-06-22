import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';

import VerticalList from '../../../common-ui/VerticalList';

import { Modal, Segment, Divider, Button, Label } from 'semantic-ui-react';
import Api from '../../../Api';

export default class ProblemPreviewPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      myProblemId: null,
      open: false,
      shouldUpdate: false,
    };
  }
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.myProblemId !== prevState.myProblemId) {
      return { shouldUpdate: true };
    }
    return { shouldUpdate: false };
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate) {
      Api.get('/student/library/my-book/my-problem/problem-id', {
        params: { myProblemId: this.props.myProblemId },
      }).then(({ data }) =>
        this.setState({
          problem: data.problem,
          myProblemId: this.props.myProblemId,
        }),
      );
    }
  }
  render() {
    const { problem } = this.state;
    const { problemNumber, content, isOptional, answer, solution, image, title } = problem;
    let optionContents = [];
    let numbers = ['①', '②', '③', '④', '⑤'];
    if (isOptional) {
      optionContents.push(problem.option1);
      optionContents.push(problem.option2);
      optionContents.push(problem.option3);
      optionContents.push(problem.option4);
      optionContents.push(problem.option5);
    }
    return (
      <div style={{ paddingTop: 10 }}>
        <Segment attached="top">
          참고할 문제를 선택해 주세요
          <Label
            attached="top right"
            basic
            icon="eye"
            content="미리 보기"
            onClick={() => this.show()}
          />
        </Segment>
        <Modal open={this.state.open} dimmer="inverted">
          <Modal.Content>
            <Segment>
              <Text large>
                {problemNumber ? problemNumber + '.' : null}
                {title}
              </Text>
            </Segment>
            <Divider />
            <Segment>
              {image ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={image}
                    alt={problemNumber + '문제 그림'}
                    style={{
                      maxHeight: '30vh',
                      minHeight: '10vh',
                      width: 'auto',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              ) : null}
              {content ? <Segment>{content}</Segment> : null}
              {isOptional ? (
                <VerticalList spacingBetween={1}>
                  {optionContents.map((option, index) => (
                    <Text key={index}>
                      {numbers[index]} : {option}
                    </Text>
                  ))}
                </VerticalList>
              ) : null}
            </Segment>
            <Segment>
              {problemNumber ? <Text>정답: {answer}</Text> : null}
              <br />
              <Text>해설: {solution}</Text>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button basic content="닫기" color="red" icon="close" onClick={() => this.close()} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
