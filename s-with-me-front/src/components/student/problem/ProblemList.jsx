import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    requestMyProblemList: () => {},
  };

  componentDidMount() {
    const { id, number, continuePageNumber } = this.props;
    const pageNumber = continuePageNumber || number || 1;
    this.props.requestMyProblemList(id, { page: pageNumber }, pageNumber);
  }

  render() {
    const { myProblemList, loading, id, number } = this.props;
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: 3 }}>
            <ProblemBar myProblemList={myProblemList} isLoading={loading} number={number} />
          </div>
          <div style={{ flex: 1, padding: 3 }}>
            {/* <ProblemBar myProblemList={myProblemList} isLoading={loading} /> */}
          </div>
        </div>
        <ProblemPaginationContainer id={id} />
      </React.Fragment>
    );
  }
}
