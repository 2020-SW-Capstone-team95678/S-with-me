import React, { PureComponent } from 'react';

export default class NewSolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { setMyNewSolution, id } = this.props;
    e.preventDefault();
    setMyNewSolution(id, e.target.value);
  }
  render() {
    return (
      <input
        type="text"
        name="textSolutionInput"
        label="텍스트 풀이 입력"
        onChange={this.handleChange}
      />
    );
  }
}
