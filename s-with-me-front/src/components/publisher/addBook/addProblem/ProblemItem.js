import React from 'react';
import './ProblemItem.css';
class ProblemItem extends React.Component {
  render() {

    const { Problem,onEditProblem,onClick,active,problemNumber } = this.props;
    //const { problemText,solution,solutionContents,problemNumber} = Problem;
    return (
      <div
        className={active ? "item active" : "item"}
        onClick={onClick}
      >
          <div className="number">{problemNumber ? problemNumber : '번호'}</div>
        
      </div>
    );
  }
}

export default ProblemItem;