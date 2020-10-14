import React, { PureComponent } from 'react';
import { Button, List, Segment } from 'semantic-ui-react';
import Text from '../../../common-ui/Text';


import {viewLatex} from '../../../constants/delimeters';
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
    const {problemNumber, title, image, content, isOptional, isMath} = problem;
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
          <Segment attached="top">
          <Button
            size="mini"
            floated="right"
            basic
            color="orange"
            onClick={this.handleEdit}
            icon="wrench"
            content="수정"
          />
          <Text large>
            {problemNumber ? problemNumber + '. ' : ' '}{isMath ? viewLatex(title) : title}
          </Text>
          </Segment>
      {image ? (
        <Segment attached>
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
        </Segment>
      ) : null}
      {content ? <Segment attached>{isMath ? viewLatex(content) : content}</Segment> : null}
      {isOptional ? (<Segment attached><List ordered>
        <List.Item>①{isMath ? viewLatex(problem.option1) : problem.option1}</List.Item>
        <List.Item>②{isMath ? viewLatex(problem.option2) : problem.option2}</List.Item>
        <List.Item>③{isMath ? viewLatex(problem.option3) : problem.option3}</List.Item>
        <List.Item>④{isMath ? viewLatex(problem.option4) : problem.option4}</List.Item>
        <List.Item>⑤{isMath ? viewLatex(problem.option5) : problem.option5}</List.Item>
      </List>
      </Segment>
      ) : null}
      {problemNumber ? <Segment.Group>
        <Segment>정답</Segment>
        <Segment.Group>
          <Segment>{isMath ? viewLatex(problem.answer) : problem.answer}</Segment>
        </Segment.Group>
      </Segment.Group> : null}
      <Segment.Group>
        <Segment>해설</Segment>
        <Segment.Group>
          <Segment>{isMath ? viewLatex(problem.solution) : problem.solution}</Segment>
        </Segment.Group>
      </Segment.Group>
        </div>
      );
    }
  }
}
