
import React from 'react';
import './MainIndex.css';

import SubIndexApp from '../addsubIndex/SubIndexApp';
import Form from '../../../../common-ui/Form';


class MainIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerComplete: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(values) {
    const {createMainChapter} = this.props;
    if (this.state.isValidForm) {
      createMainChapter(values, () => this.setState({ registerComplete: true }));
    }
    console.log("ok");
  }

  render() {
    const { loading,note, onEditNote } = this.props;
    const { MchapId, title, contents } = note;
    console.log(MchapId);

    return (
      <div>
        
        <div style={{border: "1px gray solid"}}></div>
        <div className="note">
          <div className="line">
                     
          <input
            className="title"
            value={title}
            onChange={(e) => onEditNote('title', e)}
          />
 
         </div>
         
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
