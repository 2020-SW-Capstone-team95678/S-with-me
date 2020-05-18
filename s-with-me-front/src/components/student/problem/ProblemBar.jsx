import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Spacing from '../../../common-ui/Spacing';
import withLoading from '../../../common-ui/withLoading';

import ProblemView from './ProblemView';
import ProblemResultView from './ProblemResultView';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class ProblemBar extends PureComponent {
  render() {
    const { myProblemList } = this.props;
    return (
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
                  isOptional={problem.isOptional}
                  myProblemId={myProblemId}
                  answer={problem.answer}
                  myAnswer={myAnswer}
                />
              );
            }
          },
        )}
      </VerticalList>
    );
  }
}

export default withLoading(LoadingMessage)(ProblemBar);
