import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import Text from '../../../common-ui/Text';
import Button from '../../../common-ui/Button';
import VerticalList from '../../../common-ui/VerticalList';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import { DELETE_NOTE } from '../../../constants/modals';

import Api from '../../../Api';
import NoteResolveContainer from '../../../containers/student/note/NoteResolveContainer';

class NoteView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      problemNum: -1,
      content: '',
      isOptional: false,
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
    };
    this.handleResolve = this.handleResolve.bind(this);
  }

  handleResolve() {
    const { setResolve, note } = this.props;
    setResolve(note.noteId, false);
  }

  componentDidMount() {
    const { note } = this.props;
    Api.get('/student/library/my-book/my-problems', {
      params: { problemId: note.problemId },
    }).then(({ data }) =>
      this.setState({
        problemNum: data.problemNumber,
        content: data.content,
        isOptional: data.isOptional,
        answer: data.answer,
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
    const { isConfused, isRight, myAnswer, myProblemId, isSolved } = note;
    const { problemNum, content, isOptional, answer } = this.state;
    let optionContents = [];
    if (isOptional) {
      optionContents.push(this.state.option1);
      optionContents.push(this.state.option2);
      optionContents.push(this.state.option3);
      optionContents.push(this.state.option4);
      optionContents.push(this.state.option5);
    }
    if (isSolved) {
      return (
        <VerticalList spacingBetween={2}>
          <div style={{ border: '1px solid' }}>
            {isRight ? <Text>(맞았어요)</Text> : <Text>(틀렸어요)</Text>}
            {isConfused ? <Text>(+헷갈렸어요)</Text> : null}
          </div>
          <div {...css(styles.body)}>
            <Text>
              {problemNum}.{content}
            </Text>
            {isOptional ? (
              <VerticalList spacingBetween={1}>
                {optionContents.map((option, index) => (
                  <Text>
                    {index + 1} : {option}
                  </Text>
                ))}
              </VerticalList>
            ) : null}
          </div>
          <div style={{ border: '1px solid' }}>
            {isRight ? null : (
              <Text>
                지난 나의 정답은 {myAnswer}
                {isOptional ? <Text>번</Text> : null}입니다.
              </Text>
            )}
            <br />
            <Text>
              정답은 {answer}
              {isOptional ? <Text>번</Text> : null} 입니다.
            </Text>
          </div>
          <div {...css(styles.container)}>
            <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
              <Button>내 풀이 보기</Button>
            </div>
            <div style={{ flex: 1, padding: 3, border: '1px solid' }}>
              <Button>해설 보기</Button>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <Modal>
              {({ openModal }) => (
                <Button onPress={() => openModal(DELETE_NOTE, { myProblemId: myProblemId })}>
                  문제 삭제
                </Button>
              )}
            </Modal>
            <Button onPress={() => this.handleResolve()}>다시 풀기</Button>
          </div>
        </VerticalList>
      );
    } else {
      <NoteResolveContainer problem={this.state} note={note} />;
    }
  }
}

export default withStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF5EB',
    height: 150,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 150,
  },
}))(NoteView);
