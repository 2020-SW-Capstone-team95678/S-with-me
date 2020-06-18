import React, { Component } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import { Segment, Label, Button } from 'semantic-ui-react';
import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';

import Api from '../../../Api';
import NoteResolveContainer from '../../../containers/student/note/NoteResolveContainer';
import MySolutionView from './MySolutionView';
import ProblemContentView from '../problem/ProblemContentView';
import MathSolutionView from '../problem/MathSolutionView';

class NoteView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      showMySolution: false,
      showSolution: false,
      showMyNewSolution: false,
      shouldUpdate: false,
    };
    this.handleResolve = this.handleResolve.bind(this);
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleResolve() {
    const { setResolve, note } = this.props;
    setResolve(note.noteId, 'PROGRESS');
  }

  handleSaveNote() {
    const { updateNote, setResolve, note } = this.props;
    let formValue = {
      isRight: note.isRight,
      solutionType: note.tempSolutionType,
      myAnswer: String(note.myAnswer),
      solvedDateTime: note.solvedDateTime,
      isMath: note.tempIsMath,
    };
    if (note.tempSolutionType === 'text') {
      if (note.tempIsMath) {
        const mathSolution = JSON.stringify(note.myNewTextSolution);
        formValue = { ...formValue, textSolution: mathSolution };
      }
      formValue = { ...formValue, textSolution: note.textSolution };
    } else if (note.tempSolutionType === 'img') {
      formValue = { ...formValue, imageSolution: note.myNewImageSolution };
    } else if (note.tempSolutionType === 'link') {
      formValue = { ...formValue, linkSolutionId: note.myNewLinkSolution };
    } else if (note.tempSolutionType === 'hand') {
      formValue = { ...formValue, linkSolutionId: note.myNewHandSolution };
    }
    updateNote(note.noteId, formValue, () => setResolve(note.noteId, 'INIT'));
  }
  componentDidMount() {
    this._isMounted = true;
    const { note, setResolve } = this.props;
    setResolve(note.noteId, 'INIT');
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: note.problemId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ problem: data });
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.note.problemId !== prevState.problem.problemId) {
      return { shouldUpdate: true };
    }
    return { shouldUpdate: false };
  }

  componentDidUpdate() {
    this._isMounted = true;
    const { note } = this.props;
    if (this.state.shouldUpdate) {
      Api.get('/student/library/my-book/my-problems', {
        params: { problemId: note.problemId },
      }).then(({ data }) => {
        if (this._isMounted) this.setState({ problem: data });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { styles, note } = this.props;
    const { isConfused, isRight, myProblemId, resolve, myAnswer } = note;
    const { solutionType, tempSolutionType } = note;
    const { showMySolution, showSolution, showMyNewSolution } = this.state;
    const { problemNumber, isOptional, solution, answer, isMath } = this.state.problem;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(this.state.problem.option1);
      optionContents.push(this.state.problem.option2);
      optionContents.push(this.state.problem.option3);
      optionContents.push(this.state.problem.option4);
      optionContents.push(this.state.problem.option5);
    }
    if (resolve === 'PROGRESS') {
      return <NoteResolveContainer problem={this.state.problem} note={note} />;
    } else {
      return (
        <VerticalList spacingBetween={2}>
          <Segment>
            {isRight ? (
              <Label color="green" attached="top left" basic size="medium">
                딩동댕! 맞았어요.
              </Label>
            ) : (
              <Label color="red" attached="top left" basic size="medium">
                땡! 틀렸어요.
              </Label>
            )}
            {isConfused ? (
              <Label tag attached="top right" size="medium" color="grey">
                이런! 헷갈렸어요.
              </Label>
            ) : null}
          </Segment>

          <ProblemContentView
            problem={this.state.problem}
            optionContents={optionContents}
            isNote
            isResultView
            note={note}
          />
          <div {...css(styles.container)}>
            {showMySolution || showMyNewSolution ? (
              <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
                <div>
                  {problemNumber ? (
                    <Text>
                      나의 답: {myAnswer}
                      <br />
                    </Text>
                  ) : null}
                  {showMyNewSolution ? (
                    <MySolutionView solutionType={tempSolutionType} note={note} isNewSolution />
                  ) : (
                    <MySolutionView solutionType={solutionType} note={note} />
                  )}
                </div>
                <Button
                  size="small"
                  basic
                  onClick={() => this.setState({ showMySolution: false, showMyNewSolution: false })}
                >
                  돌아 가기
                </Button>
              </div>
            ) : (
              <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
                {resolve === 'INIT' ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      size="small"
                      basic
                      onClick={() => this.setState({ showMySolution: true })}
                    >
                      나의 답과 풀이 보기
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      size="small"
                      basic
                      onClick={() => this.setState({ showMySolution: true })}
                    >
                      이전 풀이 보기
                    </Button>
                    <Button
                      size="small"
                      basic
                      onClick={() => this.setState({ showMyNewSolution: true })}
                    >
                      새 풀이 보기
                    </Button>
                  </div>
                )}
              </div>
            )}
            {showSolution ? (
              <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
                {problemNumber ? (
                  <Text>
                    정답:{answer} <br />
                  </Text>
                ) : null}
                <Text>
                  해설 <br />
                  {isMath ? <MathSolutionView solution={solution} /> : solution}
                </Text>
                <br />
                <Button size="small" basic onClick={() => this.setState({ showSolution: false })}>
                  돌아 가기
                </Button>
              </div>
            ) : (
              <div style={{ flex: 1, padding: 3, border: '1px solid', borderTop: '0px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button size="small" basic onClick={() => this.setState({ showSolution: true })}>
                    해답과 해설 보기
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <Button
                basic
                color="green"
                fluid
                onClick={() => this.handleResolve()}
                content="다시 풀기"
              />
            </div>
          </div>
        </VerticalList>
      );
    }
  }
}

export default withStyles(({ responsive }) => ({
  container: {
    display: 'flex',
    [responsive.small]: {
      flexDirection: 'column',
    },
    justifyContent: 'center',
    flexDirection: 'row',
  },
}))(NoteView);
