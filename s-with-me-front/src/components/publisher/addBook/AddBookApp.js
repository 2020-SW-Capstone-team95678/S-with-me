import React from 'react';
import './AddBookApp.css';
import Header from './addIndex/Header';
import List from './addIndex/IndexList';
import Note from './addIndex/MainIndex';
import Bookinfo from '../../../containers/publisher/AddBookContainer';
import { generateId } from './utils';
import Button from '../../../common-ui/Button';



class App extends React.Component {
  state = {
    notes: [    ],
    activeId: null
  }

  handleListItemClick = (MchapId) => {
    this.setState({ activeId: MchapId });
  }

  handleAddNote = () => {
    const MchapId = generateId();
    this.setState({
      notes: [
        ...this.state.notes,
        {
          MchapId: MchapId,
          title: '대단원 이름을 입력하세요.',
          contents: '내용',
        },
      ],
      activeId: MchapId,
    });
  }

  handleDeleteNote = () => {
    const notes = this.state.notes.filter((item) => item.MchapId !== this.state.activeId);
    this.setState({
      notes,
      activeId: notes.length === 0 ? null : notes[0].MchapId,
    });
  }

  handleEditNote = (type, e) => {
    const notes = [ ...this.state.notes ];
    const note = notes.find((item) => item.MchapId === this.state.activeId)
    note[type] = e.target.value;
    this.setState({
      notes,
    });
  }

  render() {
    const { notes, activeId,MchapId } = this.state;
    const activeNote = notes.filter((item) => item.MchapId === activeId)[0];
    return (
      <div className="app">

        <Bookinfo/>
        
          <div className="bar">
              <span>문제등록</span>
              <button >전체 저장</button>
          </div>
                

        <Header
          onAddNote={this.handleAddNote}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="container">
          <List
            notes={notes}
            activeId={activeId}
            onListItemClick={this.handleListItemClick}
            MchapId={MchapId}
          />
          {
            notes.length !== 0 && <Note note={activeNote} onEditNote={this.handleEditNote} />
          }
        </div>
        
      </div>
    );
  }
}

export default App;