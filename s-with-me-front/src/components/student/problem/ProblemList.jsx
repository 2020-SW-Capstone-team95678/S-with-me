import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    requestMyProblemList: () => {},
  };

  componentDidMount() {
    const { subChapterId, number } = this.props;
    const pageNumber = number || 1;
    this.props.requestMyProblemList({ subChapterId: subChapterId }, pageNumber);
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
