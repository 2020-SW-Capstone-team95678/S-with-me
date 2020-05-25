import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    requestMyProblemList: () => {},
  };

  componentDidMount() {
    const { subChapterId, page } = this.props;
    this.props.requestMyProblemList({ subChapterId: subChapterId }, page);
  }

  render() {
    const { myProblemList, loading, subChapterId } = this.props;
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 3 }}>
            <ProblemBar myProblemList={myProblemList} isLoading={loading} />
          </div>
          <div style={{ flex: 1, padding: 3 }}>
            {/* <ProblemBar myProblemList={myProblemList} isLoading={loading} /> */}
          </div>
        </div>
        <ProblemPaginationContainer subChapterId={subChapterId} />
      </React.Fragment>
    );
  }
}
