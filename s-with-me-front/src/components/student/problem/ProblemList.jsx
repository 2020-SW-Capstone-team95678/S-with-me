import React, { PureComponent } from 'react';

import VerticalList from '../../../common-ui/VerticalList';
import ProblemView from './ProblemView';

import Api from '../../../Api';

export default class ProblemList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { problemList: [] };
  }
  componentDidMount() {
    Api.get('/problemList').then(response => this.setState({ problemList: response.data }));
  }
  render() {
    const { problemList } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, padding: 3 }}>
          <VerticalList spacingBetween={10}>
            {problemList.map(problem => (
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
            {problemList.map(problem => (
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
