import React, { PureComponent } from 'react';
import { List, Button } from 'semantic-ui-react';

import EditProblemContainer from '../../../containers/publisher/EditProblemContainer';
import ProblemView from './ProblemView';

export default class EditorApp extends PureComponent {
  constructor() {
    super();
    this.state = { selectedProblem: {}, isEditing: false, isAdding: false };
  }

  componentDidMount() {
    const { subChapterId } = this.props.match.params;
    this.props.requestProblemList({ subChapterId: subChapterId });
  }

  selectProblem = problem => {
    this.setState({ selectedProblem: problem });
  };

  handleEdit = () => this.setState({ isEditing: !this.state.isEditing });
  handleAdding = () => this.setState({ isAdding: !this.state.isAdding });

  render() {
    const { problemList } = this.props;
    const { subChapterId } = this.props.match.params;
    const { selectedProblem, isEditing, isAdding } = this.state;
    return (
      <div>
        <div>문제 편집 페이지 입니다. 책이름 (소단원이름) </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 10 }}>
            <Button
              floated="right"
              basic
              positive
              disabled={isEditing}
              icon={isAdding ? 'reply' : 'add'}
              circular
              size="mini"
              content="새로운 문제 추가"
              onClick={() => this.setState({ isAdding: !isAdding })}
            />
            <div>문제 목록</div>
            <List divided verticalAlign="middle">
              {problemList.map(problem => (
                <List.Item
                  onClick={() => this.selectProblem(problem)}
                  disabled={!isAdding && selectedProblem.problemId === problem.problemId}
                >
                  <List.Content floated="right">
                    <Button
                      icon="delete"
                      basic
                      negative
                      disabled={isAdding || isEditing}
                      content="삭제"
                      size="tiny"
                      onClick={() =>
                        this.props.deleteProblem(problem.problemId, () => {
                          const { subChapterId } = this.props.match.params;
                          this.props.requestProblemList({ subChapterId: subChapterId });
                        })
                      }
                    />
                  </List.Content>
                  <List.Content>
                    {problem.problemNumber}. {problem.title}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
          <div style={{ flex: 4, padding: 10 }}>
            {isAdding && !isEditing ? (
              <EditProblemContainer
                subChapterId={subChapterId}
                isNew
                handleEdit={this.handleAdding}
              />
            ) : (
              <ProblemView
                subChapterId={subChapterId}
                problem={selectedProblem}
                handleEdit={this.handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
