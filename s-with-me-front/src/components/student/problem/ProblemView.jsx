import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Form from '../../../common-ui/Form';

import AnswerInputContainer from '../../../containers/student/problem/AnswerInputContainer';
import IsConfusedContainer from '../../../containers/student/problem/IsConfusedContainer';
import SolutionInputContainer from '../../../containers/student/problem/SolutionInputContainer';
import ScoringButtonContainer from '../../../containers/student/problem/ScoringButtonContainer';
import ProblemResultViewContainer from '../../../containers/student/problem/ProblemResultViewContainer';
import SolutionFilterContainer from '../../../containers/student/problem/SolutionFilterContainer';

import Api from '../../../Api';

class ProblemView extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      problemNum: null,
      content: '',
      solution: '',
      isOptional: null,
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
    };
  }

  componentDidMount() {
    const { myProblem } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: myProblem.problemId },
    }).then(({ data }) =>
      this.setState({
        problemId: data.problemId,
        problemNum: data.problemNumber,
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

  handleSubmit() {
    const { myProblem, updateMyProblem, setIsSolved } = this.props;
    let formValue = {
      isConfused: myProblem.isConfused,
      isRight: myProblem.isRight,
      isSolved: true,
      solutionType: myProblem.solutionType,
      myAnswer: String(myProblem.myAnswer),
      solvedDateTime: myProblem.solvedDateTime,
    };
    if (myProblem.solutionType === 'text') {
      formValue = { ...formValue, textSolution: myProblem.textSolution };
    } else if (myProblem.solutionType === 'img') {
      formValue = { ...formValue, imageSolution: myProblem.imageSolution };
    } else {
      formValue = { ...formValue, linkSolutionId: myProblem.linkSolutionId };
    }
    updateMyProblem(myProblem.myProblemId, formValue, () => {
      setIsSolved(myProblem.myProblemId, true);
    });
  }

  componentDidUpdate() {
    const { myProblem } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: myProblem.problemId },
    }).then(({ data }) =>
      this.setState({
        problemId: data.problemId,
        problemNum: data.problemNumber,
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
    const { myProblem, styles, loading, page } = this.props;
    const { myProblemId, myAnswer, myBookId, isSolved, solutionType } = myProblem;
    const { problemNum, content, isOptional, answer } = this.state;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(this.state.option1);
      optionContents.push(this.state.option2);
      optionContents.push(this.state.option3);
      optionContents.push(this.state.option4);
      optionContents.push(this.state.option5);
    }
    if (!isSolved) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Consumer>
            {({ onChange, values }) => (
              <VerticalList spacingBetween={2}>
                <div {...css(styles.body)}>
                  <Text large>
                    {problemNum}.{content}
                  </Text>
                  <AnswerInputContainer
                    id={myProblemId}
                    isOptional={isOptional}
                    optionContents={optionContents}
                  />
                </div>
                <div {...css(styles.container)}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 3,
                      border: '1px solid',
                      fontSize: 'small',
                    }}
                  >
                    <SolutionFilterContainer id={myProblemId} />
                  </div>
                  <SolutionInputContainer
                    id={myProblemId}
                    solutionType={solutionType}
                    onChange={onChange}
                    values={values}
                    myBookId={myBookId}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <IsConfusedContainer id={myProblemId} />
                  <ScoringButtonContainer
                    id={myProblemId}
                    answer={answer}
                    myAnswer={myAnswer}
                    myBookId={myBookId}
                    disabled={loading}
                    page={page}
                  >
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
        <ProblemResultViewContainer
          myProblem={myProblem}
          problem={this.state}
          optionContents={optionContents}
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
    borderRadius: 2,
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
