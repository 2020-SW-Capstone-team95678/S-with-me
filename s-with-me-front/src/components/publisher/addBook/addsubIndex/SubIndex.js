
import React from 'react';
import './SubIndex.css';

import AddProblemApp from '../addProblem/AddProblemApp';

class SubIndex extends React.Component {
  render() {
    const { SubNote, onEditNote } = this.props;
    const { SubTitle, SchapId } = SubNote;

    return (
      <div>
        
        <div className="sub-note">
          <input
            className="title"
            value={SubTitle}
            onChange={(e) => onEditNote('SubTitle', e)}
          />
          
          <AddProblemApp SchapId={SchapId}/>

        </div>
      </div>
    );
  }
}

export default SubIndex;