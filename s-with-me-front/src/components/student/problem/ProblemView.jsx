import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Form from '../../../common-ui/Form';
import IsConfusedContainer from '../../../containers/student/problem/IsConfusedContainer';
import SolutionInputContainer from '../../../containers/student/problem/SolutionInputContainer';
import ScoringButtonContainer from '../../../containers/student/problem/ScoringButtonContainer';
import ProblemResultViewContainer from '../../../containers/student/problem/ProblemResultViewContainer';
import SolutionFilterContainer from '../../../containers/student/problem/SolutionFilterContainer';

import Api from '../../../Api';
import ProblemContentView from './ProblemContentView';

class ProblemView extends PureComponent {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { problem: {}, shouldUpdate: false };
  }

  componentDidMount() {
    this._isMounted = true;
    const { myProblem } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: myProblem.problemId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ problem: data });
    });
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
      if (myProblem.isMath) {
        const mathSolution = JSON.stringify(myProblem.textSolution);
        formValue = { ...formValue, textSolution: mathSolution };
      }
      formValue = { ...formValue, textSolution: myProblem.textSolution };
    } else if (myProblem.solutionType === 'img') {
      formValue = { ...formValue, imageSolution: myProblem.imageSolution };
    } else if (myProblem.solutionType === 'link') {
      formValue = { ...formValue, linkSolutionId: myProblem.linkSolutionId };
    } else if (myProblem.solutionType === 'hand') {
      formValue = { ...formValue, handSolution: myProblem.handSolution };
    }
    updateMyProblem(myProblem.myProblemId, formValue, () => {
      setIsSolved(myProblem.myProblemId, true);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.myProblem.problemId !== prevState.problem.problemId) {
      return { shouldUpdate: true };
    }
    return { shouldUpdate: false };
  }

  componentDidUpdate() {
    this._isMounted = true;
    const { myProblem } = this.props;
    if (this.state.shouldUpdate) {
      Api.get('/student/library/my-book/my-problems', {
        params: { problemId: myProblem.problemId },
      }).then(({ data }) => {
        if (this._isMounted) this.setState({ problem: data });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { myProblem, styles, loading, page } = this.props;
    const { myProblemId, myAnswer, myBookId, isSolved, solutionType } = myProblem;
    const { problemNumber, isOptional, answer } = this.state.problem;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(this.state.problem.option1);
      optionContents.push(this.state.problem.option2);
      optionContents.push(this.state.problem.option3);
      optionContents.push(this.state.problem.option4);
      optionContents.push(this.state.problem.option5);
    }
    if (!isSolved) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Consumer>
            {({ onChange, values }) => (
              <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 2 }}>
                <ProblemContentView
                  problem={this.state.problem}
                  myProblem={myProblem}
                  optionContents={optionContents}
                />
                <div>
                  {problemNumber ? (
                    <div {...css(styles.container)}>
                      <SolutionFilterContainer id={myProblemId} />
                      <SolutionInputContainer
                        id={myProblemId}
                        solutionType={solutionType}
                        onChange={onChange}
                        values={values}
                        myBookId={myBookId}
                      />
                    </div>
                  ) : null}
                  {problemNumber ? (
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}
                    >
                      <IsConfusedContainer id={myProblemId} />
                      <ScoringButtonContainer
                        id={myProblemId}
                        answer={answer}
                        myAnswer={myAnswer}
                        myBookId={myBookId}
                        disabled={loading}
                        page={page}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </Form.Consumer>
        </Form>
      );
    } else {
      return (
        <ProblemResultViewContainer
          myProblem={myProblem}
          problem={this.state.problem}
          optionContents={optionContents}
        />
      );
    }
  }
}

export default withStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    alignContent: 'flex-start',
    border: '1px solid',
    borderTop: '0px',
  },
}))(ProblemView);
