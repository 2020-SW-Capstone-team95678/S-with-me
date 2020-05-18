
import React from 'react';
import './MainIndex.css';
import AddProblemApp from '../addProblem/AddProblemApp';
import SubHeader from '../addsubIndex/SubHeader';
import SubIndexApp from '../addsubIndex/SubIndexApp';


class MainIndex extends React.Component {
  
  render() {
    const { note, onEditNote } = this.props;
    const { MchapId, title, contents } = note;
    console.log(MchapId);
    return (
      <div>
        <div style={{border: "1px gray solid"}}></div>
        <div className="note">
          <input
            className="title"
            value={title}
            onChange={(e) => onEditNote('title', e)}
          />
         
         <SubIndexApp 
            MchapId={MchapId}/>
          <textarea
          className="note-contents"
          value={contents}
          onChange={(e) => onEditNote('contents', e)}
        />
        </div>
      </div>
    );
  }
}


export default MainIndex;
