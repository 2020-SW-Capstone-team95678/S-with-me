
import React from 'react';
import './IndexItem.css';

//import {createMainChapter} from '../../../../actions/createMainChapterAction'


class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerComplete: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit=()=> {
    const {createMainChapter} = this.props
    const {title}=this.props;
    console.log("ok"+title);
    createMainChapter(title, () => this.setState({ registerComplete: true }));
  }
  
  render() {
    const { loading,active, title, onClick} = this.props;
    return (<div>
      <div 
        className={active ? "list-item active" : "list-item"}
        onClick={onClick}
      >
        
        <div className="title">{title ? title : '제목을 작성해주세요'}</div>
     
      </div>
      <button type="submit" disabled={loading} onClick={this.handleSubmit}>저장</button>
      </div>
    );
  
  }
}

export default IndexItem;



// constructor(props) {
//   super(props);
//   this.state = { registerComplete: false};
//   this.handleSubmit = this.handleSubmit.bind(this);
// }

// handleSubmit=()=> {
//   const {title}=this.props;
//   console.log("ok"+title);
//   createMainChapter(title, () => this.setState({ registerComplete: true }));
// }

// render() {
//   const { loading,active, title, onClick} = this.props;
//   return (<div>
//     <div 
//       className={active ? "list-item active" : "list-item"}
//       onClick={onClick}
//     >
      
//       <div className="title">{title ? title : '제목을 작성해주세요'}</div>
   
//     </div>
//     <button type="submit" disabled={loading} onClick={this.handleSubmit}>저장</button>
//     </div>
//   );

// }