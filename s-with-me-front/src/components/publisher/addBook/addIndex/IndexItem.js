
import React from 'react';
import './IndexItem.css';
import Form from '../../../../common-ui/Form';
import {createMainChapter} from '../../../../actions/bookAction'


class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerComplete: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit=()=> {
    const {title}=this.state;
    createMainChapter(title, () => this.setState({ registerComplete: true }));
    
    console.log("ok");
  }
  
  render() {
    const { loading,active, title, onClick} = this.props;
    return (<div>
      <div
        className={active ? "list-item active" : "list-item"}
        onClick={onClick}
      >
        
        <div className="title">{title ? title : '제목'}</div>
     
      </div>
      <button type="submit" disabled={loading} onClick={this.handleSubmit}>저장</button>
      </div>
    );
  
  }
}

export default IndexItem;