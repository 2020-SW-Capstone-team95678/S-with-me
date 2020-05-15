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
    Api.get('/myProblemList').then(({ data }) => this.props.setMyProblemList(data));
  }
  render() {
    const { myProblemList } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {myProblemList.map(({ problem, myProblemId, myAnswer, isConfused }) => {
              if (myAnswer) {
                return (
                  <ProblemResultView
                    problemNum={problem.problemNum}
                    content={problem.content}
                    isOptional={problem.isOptional}
                    myProblemId={myProblemId}
                    isRight={problem.answer == myAnswer ? true : false}
                    myAnswer={myAnswer}
                    isConfused={isConfused}
                  />
                );
              } else {
                return (
                  <ProblemView
                    problemNum={problem.problemNum}
                    content={problem.content}
                    isOptional={problem.isOptional}
                    myProblemId={myProblemId}
                  />
                );
              }
            })}
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
