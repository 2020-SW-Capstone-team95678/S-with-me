import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Breadcrumb, Segment } from 'semantic-ui-react';

import EditProblemContainer from '../../../containers/publisher/EditProblemContainer';
import ProblemView from './ProblemView';

export default class EditorApp extends PureComponent {
  constructor() {
    super();
    this.state = { selectedProblem: {}, isEditing: false, isAdding: false };
  }

  componentDidMount() {
    const { subChapterId } = this.props.location.state;
    this.props.requestProblemList({ subChapterId: subChapterId });
  }

  selectProblem = (problem) => {
    this.setState({ selectedProblem: problem });
  };

  handleEdit = () => this.setState({ isEditing: !this.state.isEditing });
  handleAdding = () => this.setState({ isAdding: !this.state.isAdding });

  render() {
    const { problemList } = this.props;
    const { name, mainChapter, subChapter } = this.props.match.params;
    const { subChapterId, book } = this.props.location.state;
    const { selectedProblem, isEditing, isAdding } = this.state;

    const linkTOC = (
      <Link
        to={{
          pathname: `/inventory/${name}/table-of-contents`,
          state: {
            book: book,
          },
        }}
      >
        {name}
      </Link>
    );
    const sections = [
      { key: 'name', content: linkTOC, link: true },
      { key: 'mainChapter', content: mainChapter },
      { key: 'subChapter', content: subChapter, active: true },
    ];
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 10 }}>
            <Segment color="blue">문제 조회 및 편집</Segment>
          </div>
          <div style={{ flex: 4, padding: 10 }}>
            <Segment>
              <Breadcrumb icon="right angle" sections={sections} size="huge" />
            </Segment>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                basic
                positive
                disabled={isEditing}
                icon={isAdding ? 'reply' : 'add'}
                circular
                size="medium"
                content="새로운 문제 추가"
                onClick={() => this.setState({ isAdding: !isAdding })}
              />
            </div>
            <List divided verticalAlign="middle">
              {problemList.map((problem) => (
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
                    No. <b>{problem.problemNumber}</b>
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
