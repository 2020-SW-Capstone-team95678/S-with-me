import React from 'react';
import './AddBookApp.css';
import Header from './addIndex/Header';
import List from './addIndex/IndexList';
import MainIndex from './addIndex/MainIndex';
import Bookinfo from '../../../containers/publisher/AddBookContainer'; 
import { generateId } from './utils';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNote = this.handleAddNote.bind(this);
  }
  
  
  state = {
    notes: [    ],
    activeId: null
  }

  
  handleListItemClick = (mainChapterId) => {
    this.setState({ activeId: mainChapterId});
  }

  handleAddNote = () => {
    const {bookId} =this.state; 
    console.log(bookId);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          bookId:bookId,
          mainChapterId: "",
          title: '대단원 이름을 입력하세요.',
          contents: '내용',
        },
      ],
      activeId: '',
    });
  }

  handleDeleteNote = () => {
    const notes = this.state.notes.filter((item) => item.mainChapterId !== this.state.activeId);
    this.setState({
      notes,
      activeId: notes.length === 0 ? null : notes[0].mainChapterId,
    });
  }

  handleEditNote = (type, e) => {
    const notes = [ ...this.state.notes ];
    const note = notes.find((item) => item.mainChapterId === this.state.activeId)
    note[type] = e.target.value;
    this.setState({
      notes,
    });
  }

  handleGetBookId = (value)=>{
    this.setState({bookId:value});
    console.log(value);
  }

  // handleEditMainChapterId = (value) => {
  //   const notes = [ ...this.state.notes ];
  //   const note = notes.find((item) => item.title === this.state.activeName)
  //   note.mainChapterId = value;
  //   this.setState({
  //     notes,
  //   });
  // }

  handleGetMainChapterId = (value)=>{
    console.log(value);
    const mainChapterId = value;
    const notes = [ ...this.state.notes ];
    const note={
      title: notes[notes.length-1].title,
      bookId: notes[notes.length-1].bookId,
      mainChapterId: mainChapterId,
    }
    this.setState({notes: notes.map((note)=> note===notes[notes.length-1] ? null: note)})
    console.log(notes);
    this.setState({
      notes: [
            ...this.state.notes,
            note,
          ],
    });
    console.log(note);
    //this.setState({note:[...this.state.note, {mainChapterId:value}]});

    // console.log(note);
    // this.setState({
    //   notes: [
    //     ...this.state.notes,
    //     note,
    //   ],
    // });
    console.log(value);
  }

  render() {
    const { notes, activeId,bookId,mainChapterId } = this.state;
    const activeNote = notes.filter((item) => item.mainChapterId === activeId)[0];
    console.log(notes);
    return (
      <div className="app" >

        <Bookinfo onGetBookId={this.handleGetBookId}/>
        
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
            bookId={bookId}
            activeId={activeId}
            onGetMainChapterId={this.handleGetMainChapterId}
            onListItemClick={this.handleListItemClick}
          />
          {
            notes.length !== 0 && <MainIndex note={activeNote} onEditNote={this.handleEditNote} />
          }
        </div>
        
      </div>
    );
  }
}

export default App;