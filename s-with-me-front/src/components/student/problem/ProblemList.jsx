import React, { PureComponent } from 'react';

import VerticalList from '../../../common-ui/VerticalList';
import ProblemView from './ProblemView';

import Api from '../../../Api';

export default class ProblemList extends PureComponent {
  static defaultProps = {
    myProblemList: [],
    setMyProblemList: () => {},
  };

  componentDidMount() {
    Api.get('/myProblemList').then(({ data }) => this.props.setMyProblemList(data));
  }
  render() {
    const { myProblemList } = this.props;
    console.log(myProblemList);

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {myProblemList.map(({ problem }) => (
              <ProblemView
                problemNum={problem.problemNum}
                content={problem.content}
                isOptional={problem.isOptional}
              />
            ))}
          </VerticalList>
        </div>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {myProblemList.map(({ problem }) => (
              <ProblemView
                problemNum={problem.problemNum}
                content={problem.content}
                isOptional={problem.isOptional}
              />
            ))}
          </VerticalList>
        </div>
      </div>
    );
  }
}
