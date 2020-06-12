import React, { Component } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_NOTE } from '../../../constants/modals';

import Api from '../../../Api';
import NoteResolveContainer from '../../../containers/student/note/NoteResolveContainer';
import MySolutionView from './MySolutionView';

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
    } else {
      formValue = { ...formValue, linkSolutionId: note.myNewLinkSolution };
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
    const {
      problemNumber,
      content,
      title,
      image,
      isOptional,
      solution,
      answer,
    } = this.state.problem;
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
          <div style={{ border: '1px solid' }}>
            {isRight ? <Text>(맞았어요)</Text> : <Text>(틀렸어요)</Text>}
            {isConfused ? <Text>(+헷갈렸어요)</Text> : null}
          </div>
          <div {...css(styles.body)}>
            <Text>
              {problemNumber ? problemNumber + '.' : null}
              {title}
            </Text>
            {image ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={image}
                  alt={problemNumber + '문제 그림'}
                  style={{ maxHeight: '30vh', minHeight: '10vh', width: 'auto', maxWidth: '100%' }}
                />
              </div>
            ) : null}
            {content ? (
              <div style={{ border: '0.5px solid', padding: 2 }}>
                <Text>{content}</Text>
              </div>
            ) : null}
            {isOptional ? (
              <VerticalList spacingBetween={1}>
                {optionContents.map((option, index) => (
                  <Text key={index}>
                    {index + 1} : {option}
                  </Text>
                ))}
              </VerticalList>
            ) : null}
          </div>
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
                  onPress={() => this.setState({ showMySolution: false, showMyNewSolution: false })}
                >
                  돌아 가기
                </Button>
              </div>
            ) : (
              <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
                {resolve === 'INIT' ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onPress={() => this.setState({ showMySolution: true })}>
                      나의 답과 풀이 보기
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onPress={() => this.setState({ showMySolution: true })}>
                      이전 풀이 보기
                    </Button>
                    <Button onPress={() => this.setState({ showMyNewSolution: true })}>
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
                <Text>해설: {solution}</Text>
                <br />
                <Button onPress={() => this.setState({ showSolution: false })}>돌아 가기</Button>
              </div>
            ) : (
              <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onPress={() => this.setState({ showSolution: true })}>
                    해답과 해설 보기
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <Modal>
              {({ openModal }) => (
                <div>
                  <Button onPress={() => openModal(DELETE_NOTE, { myProblemId: myProblemId })}>
                    문제 삭제
                  </Button>
                  {resolve === 'INIT' ? null : (
                    <Button onPress={() => this.handleSaveNote()}>새 답과 풀이 저장</Button>
                  )}
                </div>
              )}
            </Modal>
            <Button onPress={() => this.handleResolve()}>다시 풀기</Button>
          </div>
        </VerticalList>
      );
    }
  }
}

export default withStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
}))(NoteView);
