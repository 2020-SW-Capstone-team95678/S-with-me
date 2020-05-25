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
    const {MchapId}=this.props;
    console.log(MchapId);
    this.setState({
      SubNotes: [
        ...this.state.SubNotes,
        {
          SchapId: SchapId,
          Mid : MchapId,
          SubTitle: '소단원 이름을 입력하세요.',
          contents: '내용',
        },
      ],
      SubActiveId: SchapId,
    });
    console.log(this.state);
  }

  handleDeleteSubNote = () => {
    const SubNotes = this.state.SubNotes.filter((item) => item.SchapId !== this.state.SubActiveId);
    this.setState({
      SubNotes,
      SubActiveId: SubNotes.length === 0 ? null : SubNotes[0].SchapId,
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



 
  render() {
    const { SubNotes, SubActiveId, MchapId} = this.state;
    const activeSubNote = SubNotes.filter((item) => item.SchapId === SubActiveId)[0];
    console.log(activeSubNote);
    console.log(this.props.MchapId);
    //const nextId=activeSubNote.Mid;
    const newSubNotes = SubNotes.filter((item) => item.Mid === this.props.MchapId);
    
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
            MchapId={MchapId}
            newSubNotes={newSubNotes}
          />
          {
            SubNotes.length !== 0&& activeSubNote.Mid === this.props.MchapId &&  <SubIndex SubNote={activeSubNote} onEditNote={this.handleEditSubNote} />
          }
        </div>
        
      </div>
    );
  }
}

export default SubIndexApp;