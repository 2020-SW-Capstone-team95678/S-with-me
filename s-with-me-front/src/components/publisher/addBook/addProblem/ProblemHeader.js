import React from 'react';
import './ProblemHeader.css';

class Header extends React.Component {
  render() {
    const { onAddNote, onDeleteNote } = this.props;
    return (
      <div className="ProblemHeader">
        <div className="title">
          <span>문제 생성</span>
        </div>
        <div className="buttons">
          <button onClick={onAddNote}>추가</button>
          <button onClick={onDeleteNote}>삭제</button>
        </div>
      </div>
    );
  }
}

export default Header;