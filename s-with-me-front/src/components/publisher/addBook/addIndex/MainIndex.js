
import React from 'react';
import './MainIndex.css';

import SubIndexApp from '../addsubIndex/SubIndexApp';


class MainIndex extends React.Component {
  
  
  
  render() {
    const { mainChapterId, title,note, onEditNote } = this.props;
    //const { mainChapterId, title } = note;
    console.log(mainChapterId);
    
    return (
      <div>
        <div style={{border: "1px gray solid"}}></div>
        <div className="note">
          <input
            className="title"
            value={title}
            onChange={(e) => onEditNote('title', e)}
          />
         
         <SubIndexApp MchapId={mainChapterId}/>

        
        </div>
      </div>
    );
  }
}


export default MainIndex;
