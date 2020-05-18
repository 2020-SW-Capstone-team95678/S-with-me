import React from 'react';
import './SubIndexApp.css';
import Header from './SubHeader';
import List from './SubIndexList';
import SubIndex from './SubIndex';
import { generateId } from '../utils';
import MainIndex ,{ join } from '../addIndex/MainIndex'; 

class SubIndexApp extends React.Component {
   
  state = {
    SubNotes: [  ],
    SubActiveId: null,
  }

  handleListSubItemClick = (SchapId) => {

    this.setState({ SubActiveId: SchapId });
  }

  handleAddSubNote = () => {
    const SchapId = generateId();
    this.setState({
      SubNotes: [
        ...this.state.SubNotes,
        {
          SchapId: SchapId,
          //Mid : MchapId,
          SubTitle: '소단원 이름을 입력하세요.',
          contents: '내용',
        },
      ],
      SubActiveId: SchapId,
    });
  }

  handleDeleteSubNote = () => {
    const SubNotes = this.state.SubNotes.filter((item) => item.SchapId !== this.state.SubActiveId);
    this.setState({
      SubNotes,
      SubActiveId: SubNotes.length === 0 ? null : SubNotes[0].MchapId,
    });
  }

  handleEditSubNote = (type, e) => {
    const SubNotes = [ ...this.state.SubNotes ];
    const SubNote = SubNotes.find((item) => item.SchapId === this.state.SubActiveId)
    SubNote[type] = e.target.value;
    this.setState({
      SubNotes,
    });
  }

  handleDeleteHeader = () => {
    console.log("OK");
    if(DeleteHeaderMainId!==null){

    }
  }

 
  render() {
    const { SubNotes, SubActiveId} = this.state;
    const activeSubNote = SubNotes.filter((item) => item.SchapId === SubActiveId)[0];
    return (
      <div className="subApp">
        <Header
          onAddNote={this.handleAddSubNote}
          onDeleteNote={this.handleDeleteSubNote}
        />
        <div className="container">
          <List
            SubNotes={SubNotes}
            SubActiveId={SubActiveId}
            onListItemClick={this.handleListSubItemClick}
          />
          {
            SubNotes.length !== 0 && <SubIndex SubNote={activeSubNote} onEditNote={this.handleEditSubNote} />
          }
        </div>
        
      </div>
    );
  }
}

export default SubIndexApp;