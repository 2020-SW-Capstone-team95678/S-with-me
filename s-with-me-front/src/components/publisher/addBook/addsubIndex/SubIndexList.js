import React from 'react';
import './IndexList.css';
import SubIndexItem from './SubIndexItem';


class SubIndexList extends React.Component {
  render() {
    const { SubNotes, SubActiveId, onListItemClick, MchapId } = this.props;
    return (
      <div className="sub-list">
        {SubNotes.map((item) => {
          const { SchapId, SubTitle, contents } = item;
          return (
            <SubIndexItem
              key={SchapId}
              SchapId={SchapId}
              Subactive={SchapId === SubActiveId}
              SubTitle={SubTitle}
              contents={contents}
              onClick={() => onListItemClick(SchapId)}
            />
            
          );
        })}
      </div>
    );
  }
}

export default SubIndexList;