
import React from 'react';
import './MainIndex.css';
import ProblemHeader from '../addProblem/ProblemHeader';
import SubHeader from '../addsubIndex/SubHeader';
import SubIndexApp from '../addsubIndex/SubIndexApp';
import AddProblemApp from '../addProblem/AddProblemApp';

class MainIndex extends React.Component {
  
  render() {
    const { note, onEditNote,MchapId } = this.props;
    const { title, contents } = note;
    return (
      <div>
        <div style={{border: "1px gray solid"}}></div>
        <div className="note">
          <input
            className="title"
            value={title}
            onChange={(e) => onEditNote('title', e)}
          />
          <ProblemHeader/>
          
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
