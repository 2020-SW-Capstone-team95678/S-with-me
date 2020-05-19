import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Form from '../../../common-ui/Form';

import SolutionFilter from './SolutionFilter';

import AnswerInputContainer from '../../../containers/student/problem/AnswerInputContainer';
import IsConfusedContainer from '../../../containers/student/problem/IsConfusedContainer';
import SolutionInputContainer from '../../../containers/student/problem/SolutionInputContainer';
import ScoringButtonContainer from '../../../containers/student/problem/ScoringButtonContainer';

import Api from '../../../Api';
import ProblemResultView from './ProblemResultView';

class ProblemView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { isSolved: false, problemNum: null, content: '', isOptional: null, answer: '' };
  }
  componentDidMount() {
    const { myProblem } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: myProblem.problemId },
    }).then(({ data }) =>
      this.setState({
        problemNum: data.problemNumber,
        content: data.content,
        isOptional: data.optional,
        answer: data.answer,
      }),
    );
  }

  handleSubmit() {
    const { myProblem, createSolvedData } = this.props;
    const formValue = {
      confused: myProblem.confused,
      myAnswer: myProblem.myAnswer,
      mySolution: myProblem.mySolution,
      right: myProblem.right,
      solvedDateTime: myProblem.solvedDateTime,
    };
    createSolvedData(myProblem.myProblemId, formValue, () => {
      this.setState({ isSolved: true });
    });
  }

  render() {
    const { myProblem, styles } = this.props;
    const { myProblemId, myAnswer } = myProblem;
    const { isSolved, problemNum, content, isOptional, answer } = this.state;
    if (!isSolved) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Consumer>
            {() => (
              <VerticalList spacingBetween={2}>
                <div {...css(styles.body)}>
                  <Text>
                    {problemNum}.{content}
                  </Text>
                  <AnswerInputContainer id={myProblemId} isOptional={isOptional} />
                </div>
                <div {...css(styles.container)}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 3,
                      border: '1px solid',
                    }}
                  >
                    <SolutionFilter />
                  </div>
                  <SolutionInputContainer id={myProblemId} />
                </div>
                <div style={{ display: 'flex' }}>
                  <IsConfusedContainer id={myProblemId} />
                  <ScoringButtonContainer id={myProblemId} answer={answer} myAnswer={myAnswer}>
                    개별 채점
                  </ScoringButtonContainer>
                </div>
              </VerticalList>
            )}
          </Form.Consumer>
        </Form>
      );
    } else {
      return (
        <ProblemResultView
          problemNum={problemNum}
          content={content}
          isOptional={isOptional}
          myProblemId={myProblemId}
          isRight={myProblem.right}
          isConfused={myProblem.confused}
          myAnswer={myAnswer}
          answer={answer}
        />
      );
    }
  }
}

export default withStyles(({ unit, color }) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
    padding: 5,
    height: 150,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    alignContent: 'flex-start',
    height: 150,
    border: '1px solid',
  },
}))(ProblemView);
