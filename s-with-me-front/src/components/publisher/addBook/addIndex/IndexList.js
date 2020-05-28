import React from 'react';
import './IndexList.css';
import CreateMainChapterContainer from '../../../../containers/publisher/CreateMainChapterContainer';



class IndexList extends React.Component {
  render() {
    const { notes, activeId, onListItemClick,onGetMainChapterId } = this.props;
    return (
      <div className="list">
        {notes.map((item) => {
          const { mainChapterId,bookId, title, contents } = item;
          return (
            <div>
            <CreateMainChapterContainer
              key={mainChapterId}
              bookId={bookId}
              mainChapterId={mainChapterId}
              active={mainChapterId === activeId}
              title={title}
              contents={contents}
              onGetMainChapterId={onGetMainChapterId}
              onClick={() => onListItemClick(mainChapterId)}
            />
            </div>
            
          );
        })}
      </div>
    );
  }
}

export default IndexList;