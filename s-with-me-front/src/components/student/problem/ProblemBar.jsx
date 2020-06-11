import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import VerticalList from '../../../common-ui/VerticalList';
import Spacing from '../../../common-ui/Spacing';
import withLoading from '../../../common-ui/withLoading';

import { isMobileOnly, isTablet } from 'react-device-detect';
import ProblemViewContainer from '../../../containers/student/problem/ProblemViewContainer';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class ProblemBar extends PureComponent {
  render() {
    const { myProblemList, page } = this.props;
    if (isMobileOnly) {
      return <div>모바일 전용</div>;
    } else if (isTablet) {
      return <div>테블릿 전용</div>;
    }
    return (
      <VerticalList spacingBetween={10}>
        {myProblemList.map((myProblem, index) => (
          <ProblemViewContainer myProblem={myProblem} key={index} page={page} />
        ))}
      </VerticalList>
    );
  }
}

export default withLoading(LoadingMessage)(ProblemBar);
