import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';
import ProblemPaginationContainer from '../../../containers/student/problem/ProblemPaginationContainer';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    requestMyProblemList: () => {},
  };

  componentDidMount() {
    const { id, number } = this.props;
    const pageNumber = number || 1;
    this.props.requestMyProblemList(id, { page: pageNumber }, pageNumber);
  }

  render() {
    const { myProblemList, loading, id } = this.props;
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
        <ProblemPaginationContainer id={id} />
      </React.Fragment>
    );
  }
}
