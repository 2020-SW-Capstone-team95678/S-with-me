import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import ProblemBar from './ProblemBar';
import PaginationContainer from '../../../containers/student/PaginationContainer';

import { isMobile } from 'react-device-detect';
import MobileProblemBar from './MobileProblemBar';

class ProblemList extends PureComponent {
  render() {
    const { myProblemList, loading, subChapterId, page, myBookId, styles } = this.props;
    const myProblemList1 = myProblemList.slice(0, 4);
    const myProblemList2 = myProblemList.slice(4, 8);
    if (isMobile) {
      return (
        <React.Fragment>
          <MobileProblemBar myProblemList={myProblemList} />
          <div {...css(styles.pagination)}>
            <PaginationContainer myBookId={myBookId} subChapterId={subChapterId} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div {...css(styles.pagination)}>
            <PaginationContainer myBookId={myBookId} subChapterId={subChapterId} />
          </div>
          <div {...css(styles.bar)}>
            <div style={{ flex: 1, padding: 3 }}>
              <ProblemBar myProblemList={myProblemList1} isLoading={loading} page={page} />
            </div>
            <div style={{ flex: 1, padding: 3 }}>
              <ProblemBar myProblemList={myProblemList2} isLoading={loading} page={page} />
            </div>
          </div>
          <div {...css(styles.pagination)}>
            <PaginationContainer myBookId={myBookId} subChapterId={subChapterId} />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default withStyles(({ responsive }) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  bar: {
    display: 'flex',
    [responsive.medium]: {
      flexDirection: 'column',
    },
    [responsive.small]: {
      flexDirection: 'column',
    },
    flexDirection: 'row',
  },
}))(ProblemList);
