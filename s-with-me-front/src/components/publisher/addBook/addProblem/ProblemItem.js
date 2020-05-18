import React from 'react';
import './ProblemItem.css';

class ProblemItem extends React.Component {
  render() {
    const { Problems, onEditProblem } = this.props;
    
    return (
      <div>
        {Problems.map((item) => {
          const { solution, solutionContents, problemText,problemNumber } = item;
          return(
            <div className="problem">
                <input
                    className="id"
                    value={problemNumber}
                    onChange={(e) => onEditProblem('problemId', e)}
                />
                <input
                    className="text"
                    value={problemText}
                    onChange={(e) => onEditProblem('problemText', e)}
                />
                <input
                    className="solution"
                    value={solution}
                    onChange={(e) => onEditProblem('solution', e)}
                />

                <textarea
                className="contents"
                value={solutionContents}
                onChange={(e) => onEditProblem('contents', e)}
                />
            </div>
          );
        })}
        </div>
    );
  }
}

export default ProblemItem;