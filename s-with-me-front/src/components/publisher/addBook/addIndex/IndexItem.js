
import React from 'react';
import './IndexItem.css';


class IndexItem extends React.Component {
  render() {
    const { active, title, onClick} = this.props;
    return (
      <div
        className={active ? "list-item active" : "list-item"}
        onClick={onClick}
      >
        
        <div className="title">{title ? title : '제목'}</div>
       
     
      </div>
    );
  }
}

export default IndexItem;