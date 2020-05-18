import React, { PureComponent } from 'react';

import VerticalList from '../../../common-ui/VerticalList';
import ProblemView from './ProblemView';

import Api from '../../../Api';
import ProblemResultView from './ProblemResultView';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    setMyProblemList: () => {},
  };

  componentDidMount() {
    const { id } = this.props;
    Api.get(`/student/library/my-book/${id}/my-problems`, {
      params: { page: 1 },
    }).then(({ data }) => this.props.setMyProblemList(data.myProblemList));
  }
  render() {
    const { myProblemList } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {myProblemList.map(
              ({ problem, myProblemId, myAnswer, isConfused, solvedDateTime, isRight }) => {
                if (solvedDateTime) {
                  return (
                    <ProblemResultView
                      problemNum={problem.problemNumber}
                      content={problem.content}
                      isOptional={problem.isOptional}
                      myProblemId={myProblemId}
                      isRight={isRight}
                      myAnswer={myAnswer}
                      isConfused={isConfused}
                      answer={problem.answer}
                    />
                  );
                } else {
                  return (
                    <ProblemView
                      problemNum={problem.problemNumber}
                      content={problem.content}
                      isOptional={problem.optional}
                      myProblemId={myProblemId}
                      answer={problem.answer}
                      myAnswer={myAnswer}
                    />
                  );
                }
              },
            )}
          </VerticalList>
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {myProblemList.map(({ problem, myProblemId }) => (
              <ProblemView
                problemNum={problem.problemNum}
                content={problem.content}
                isOptional={problem.isOptional}
                myProblemId={myProblemId}
              />
            ))}
          </VerticalList>
        </div>
      </div>
    );
  }
}
