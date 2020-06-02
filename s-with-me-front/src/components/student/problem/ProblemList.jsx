import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  render() {
    const { myProblemList, loading, subChapterId, page } = this.props;
    const myProblemList1 = myProblemList.slice(0, 4);
    const myProblemList2 = myProblemList.slice(4, 8);
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '3px',
            paddingBottom: '3px',
          }}
        >
          <ProblemPaginationContainer subChapterId={subChapterId} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 3 }}>
            <ProblemBar myProblemList={myProblemList1} isLoading={loading} page={page} />
          </div>
          <div style={{ flex: 1, padding: 3 }}>
            <ProblemBar myProblemList={myProblemList2} isLoading={loading} page={page} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '3px',
            paddingBottom: '3px',
          }}
        >
          <ProblemPaginationContainer subChapterId={subChapterId} />
        </div>
      </React.Fragment>
    );
  }
}
