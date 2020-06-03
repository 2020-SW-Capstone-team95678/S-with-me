import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_NOTE } from '../../../constants/modals';

import Api from '../../../Api';
import NoteResolveContainer from '../../../containers/student/note/NoteResolveContainer';
import MySolutionView from './MySolutionView';

class NoteView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      problemNum: -1,
      title: '',
      image: '',
      content: '',
      isOptional: false,
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
      showMySolution: false,
      showSolution: false,
      showMyNewSolution: false,
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
    const formValue = {
      solvedDateTime: note.solvedDateTime,
      isRight: note.isRight,
      myAnswer: note.myAnswer,
      mySolution: note.myNewSolution,
    };
    updateNote(note.noteId, formValue, () => setResolve(note.noteId, 'INIT'));
  }
  componentDidMount() {
    const { note, setResolve } = this.props;
    setResolve(note.noteId, 'INIT');
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: note.problemId },
    }).then(({ data }) =>
      this.setState({
        problemNum: data.problemNumber,
        content: data.content,
        isOptional: data.isOptional,
        image: data.image,
        title: data.title,
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

  componentDidUpdate() {
    const { note } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: note.problemId },
    }).then(({ data }) =>
      this.setState({
        problemNum: data.problemNumber,
        content: data.content,
        title: data.title,
        image: data.image,
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
    const { styles, note } = this.props;
    const {
      isConfused,
      isRight,
      myProblemId,
      resolve,
      myAnswer,
      solutionType,
      tempSolutionType,
    } = note;

    const {
      problemNum,
      content,
      title,
      image,
      isOptional,
      showMySolution,
      showSolution,
      showMyNewSolution,
      solution,
      answer,
    } = this.state;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(this.state.option1);
      optionContents.push(this.state.option2);
      optionContents.push(this.state.option3);
      optionContents.push(this.state.option4);
      optionContents.push(this.state.option5);
    }
    if (resolve === 'PROGRESS') {
      return <NoteResolveContainer problem={this.state} note={note} />;
    } else {
      return (
        <VerticalList spacingBetween={2}>
          <div style={{ border: '1px solid' }}>
            {isRight ? <Text>(맞았어요)</Text> : <Text>(틀렸어요)</Text>}
            {isConfused ? <Text>(+헷갈렸어요)</Text> : null}
          </div>
          <div {...css(styles.body)}>
            <Text>
              {problemNum ? problemNum + '.' : null}
              {title}
            </Text>
            {image ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={image} alt={problemNum + '문제 그림'} style={{ width: '80%' }} />
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
                  {problemNum ? (
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
                {problemNum ? (
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
            {resolve === 'INIT' ? (
              <Modal>
                {({ openModal }) => (
                  <Button onPress={() => openModal(DELETE_NOTE, { myProblemId: myProblemId })}>
                    문제 삭제
                  </Button>
                )}
              </Modal>
            ) : (
              <Button onPress={() => this.handleSaveNote()}>새 풀이 저장</Button>
            )}
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
