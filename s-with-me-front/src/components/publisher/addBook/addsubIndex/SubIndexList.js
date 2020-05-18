import React from 'react';
import './IndexList.css';
import SubIndexItem from './SubIndexItem';


class SubIndexList extends React.Component {
  render() {
    const { newSubNotes,SubNotes, SubActiveId, onListItemClick} = this.props;
    //const newSubNotes=SubNotes.filter((item) => item.Mid === this.props.MchapId);
    //console.log(this.props.MchapId);
    console.log(newSubNotes);
    console.log(SubNotes);
    return (
      <div className="sub-list">

        {newSubNotes.map((item) => {
          const { SchapId, SubTitle, contents,Mid } = item;
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