import React, { PureComponent } from 'react';

export default class SolutionInput extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { setMySolution, id } = this.props;
    e.preventDefault();
    setMySolution(id, e.target.value);
  }
  render() {
    const { solutionFilterType } = this.props;
    return (
      <div style={{ padding: '5px' }}>
        {solutionFilterType === 'text' ? (
          <textarea
            type="text"
            onChange={this.handleChange}
            name="textSolutionInput"
            style={{
              width: '100%',
              height: '110px',
              resize: 'none',
            }}
          />
        ) : (
          <div>Hello</div>
        )}
      </div>
    );
  }
}
