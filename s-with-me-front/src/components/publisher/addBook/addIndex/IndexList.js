import React from 'react';
import './IndexList.css';
import IndexItem from './IndexItem';



class IndexList extends React.Component {
  render() {
    const { notes, activeId, onListItemClick } = this.props;
    return (
      <div className="list">
        {notes.map((item) => {
          const { MchapId, title, contents } = item;
          return (
            <div>
            <IndexItem
              key={MchapId}
              MchapId={MchapId}
              active={MchapId === activeId}
              title={title}
              contents={contents}
              onClick={() => onListItemClick(MchapId)}
            />
            </div>
            
          );
        })}
      </div>
    );
  }
}

export default IndexList;