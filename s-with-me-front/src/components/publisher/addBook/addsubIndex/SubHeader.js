import React from 'react';
import '../addIndex/Header.css';

class SubHeader extends React.Component {
  render() {
    const { onAddNote, onDeleteNote } = this.props;
    return (
      <div className="subHeader">
        <div className="title">
          <span>소단원 생성</span>
        </div>
        <div className="buttons">
          <button onClick={onAddNote}>추가</button>
          <button onClick={onDeleteNote}>삭제</button>
        </div>
      </div>
    );
  }
}

export default SubHeader;