import React, { PureComponent } from 'react';

import ProblemBar from './ProblemBar';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    setMyProblemList: () => {},
  };

  componentDidMount() {
    const { id } = this.props;
    this.props.requestMyProblemList(id, { page: 1 });
  }
  render() {
    const { myProblemList, loading } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <ProblemBar myProblemList={myProblemList} isLoading={loading} />
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <ProblemBar myProblemList={myProblemList} isLoading={loading} />
        </div>
      </div>
    );
  }
}
