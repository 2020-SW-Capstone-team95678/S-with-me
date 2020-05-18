import React from 'react';
import './ProblemHeader.css';

class Header extends React.Component {
  render() {
    const { onAddProblem, onDeleteProblem } = this.props;
    return (
      <div className="ProblemHeader">
        <div className="title">
          <span>문제 생성</span>
        </div>
        <div className="buttons">
          <button onClick={onAddProblem}>추가</button>
          <button onClick={onDeleteProblem}>삭제</button>
        </div>
      </div>
    );
  }
}

export default Header;