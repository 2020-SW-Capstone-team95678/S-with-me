import React, { PureComponent } from 'react';
import { Button } from 'semantic-ui-react';

import EditProblemContainer from '../../../containers/publisher/EditProblemContainer';

export default class ProblemView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  handleEdit = () => {
    this.props.handleEdit();
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { problem, subChapterId } = this.props;
    const { isEditing } = this.state;
    if (Object.keys(problem).length === 0) return <div>문제를 선택해주세요!</div>;
    if (isEditing) {
      return (
        <EditProblemContainer
          subChapterId={subChapterId}
          problem={problem}
          handleEdit={this.handleEdit}
        />
      );
    } else {
      return (
        <div>
          <Button
            floated="right"
            basic
            color="orange"
            onClick={this.handleEdit}
            icon="wrench"
            content="수정"
          />
          <div>
            <b>문제번호</b> : {problem.problemNumber}
          </div>
          <div>
            <b>문제제목</b> : {problem.title}
          </div>
          <div>
            <b>문제내용</b>
            <div>
              <img src={problem.image} alt="문제 내용 이미지" style={{ height: '200px' }} />
              {problem.content}
            </div>
          </div>
          {problem.isOptional ? (
            <div>
              <div>1: {problem.option1}</div>
              <div>2: {problem.option2}</div>
              <div>3: {problem.option3}</div>
              <div>4: {problem.option4}</div>
              <div>5: {problem.option5}</div>
            </div>
          ) : null}
          <div>
            <b>문제정답</b> : {problem.answer}
          </div>
          <div>
            <b>문제해설</b> : {problem.solution}
          </div>
        </div>
      );
    }
  }
}
