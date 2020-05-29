import React, { PureComponent } from 'react';
import queryString from 'query-string';

import ProblemHeadContainer from '../../../containers/student/problem/ProblemHeadContainer';
import ProblemList from './ProblemList';

export default class ProblemApp extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    requestMyProblemList: () => {},
  };
  constructor(props) {
    super(props);
    this.state = { viewWrongOnly: false };
  }

  handleViewWrongOnly = () => {
    const { viewWrongOnly } = this.state;
    this.setState({ viewWrongOnly: !viewWrongOnly });
  };

  componentDidMount() {
    const { subChapterId } = this.props.match.params;
    const query = queryString.parse(this.props.location.search);
    const page = query.page || 1;
    this.props.requestMyProblemList({ subChapterId: subChapterId }, page);
  }

  render() {
    const { myBookId, subChapterId } = this.props.match.params;
    const { number, myProblemList, loading } = this.props;
    const { viewWrongOnly } = this.state;
    const onlyWrongMyProblemList = myProblemList.filter(myProblem => myProblem.isRight === false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ hight: 5, padding: 3 }}>
          <ProblemHeadContainer
            subChapterId={subChapterId}
            id={myBookId}
            handleViewWrongOnly={this.handleViewWrongOnly}
          />
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <ProblemList
            subChapterId={subChapterId}
            page={number}
            myProblemList={viewWrongOnly ? onlyWrongMyProblemList : myProblemList}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}
