import React, { PureComponent } from 'react';

export default class SolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.hadleChange = this.hadleChange.bind(this);
  }
  hadleChange(e) {
    const { setMySolution, id } = this.props;
    e.preventDefault();
    setMySolution(id, e.target.value);
  }
  render() {
    return (
      <input
        type="text"
        name="textSolutionInput"
        label="텍스트 풀이 입력"
        onChange={this.hadleChange}
      />
    );
  }
}
