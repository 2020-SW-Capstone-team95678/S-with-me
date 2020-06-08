import React, { PureComponent } from 'react';
import { withStyles, css } from '../../../common-ui/withStyles';

import ProblemBar from './ProblemBar';
import PaginationContainer from '../../../containers/student/PaginationContainer';

class ProblemList extends PureComponent {
  render() {
    const { myProblemList, loading, subChapterId, page, myBookId, styles } = this.props;
    const myProblemList1 = myProblemList.slice(0, 4);
    const myProblemList2 = myProblemList.slice(4, 8);
    return (
      <React.Fragment>
        <div {...css(styles.pagination)}>
          <PaginationContainer myBookId={myBookId} subChapterId={subChapterId} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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

export default withStyles(() => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '3px',
    paddingBottom: '3px',
  },
}))(ProblemList);
