import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    const { onAddNote, onDeleteNote } = this.props;
    return (
      <div className="header">
        <div className="title">
          <span>목차 생성</span>
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