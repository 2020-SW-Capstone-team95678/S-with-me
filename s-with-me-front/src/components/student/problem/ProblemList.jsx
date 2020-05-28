import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  render() {
    const { myProblemList, loading, subChapterId, page } = this.props;
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
            <ProblemBar myProblemList={myProblemList} isLoading={loading} page={page} />
          </div>
          <div style={{ flex: 1, padding: 3 }}>
            {/* <ProblemBar myProblemList={myProblemList} isLoading={loading} /> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
