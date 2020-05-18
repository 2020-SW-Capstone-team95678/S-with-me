
import React from 'react';
import './IndexItem.css';

class SubIndexItem extends React.Component {
  render() {
    const { Subactive, SubTitle, contents, onClick } = this.props;
    return (
      <div
        className={Subactive ? "sub-list-item active" : "sub-list-item"}
        onClick={onClick}
      >
        <div className="title">{SubTitle ? SubTitle : '제목'}</div>
     
      </div>
    );
  }
}

export default SubIndexItem;