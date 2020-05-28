import React, { PureComponent } from 'react';
import queryString from 'query-string';

import MyProblemListContainer from '../../../containers/student/problem/MyProblemListContainer';
import ProblemHeadContainer from '../../../containers/student/problem/ProblemHeadContainer';

export default class ProblemApp extends PureComponent {
  render() {
    const { myBookId, subChapterId } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const page = query.page || 1;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ hight: 5, padding: 3 }}>
          <ProblemHeadContainer subChapterId={subChapterId} id={myBookId} />
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <MyProblemListContainer subChapterId={subChapterId} page={page} />
        </div>
      </div>
    );
  }
}
