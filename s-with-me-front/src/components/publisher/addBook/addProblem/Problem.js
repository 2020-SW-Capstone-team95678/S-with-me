
import React from 'react';
import './Problem.css';
import Text from '../../../../common-ui/Text'

class Problem extends React.Component {
  render() {
    const { Problem, onEditProblem} = this.props;
    const { problemText,solution,solutionContents,problemNumber } = Problem;

    return (
      <div>
        
        <div className="problem">
          <div className="one">
              <Text>번호: </Text>
              <input
            className="number"
            value={problemNumber}
            onChange={(e) => onEditProblem('problemNumber', e)}
          />
          </div>
          <div className="one">
            <Text>문제: </Text>
            <input
                className="text"
                value={problemText}
                onChange={(e) => onEditProblem('problemText', e)}
            />
          </div>
          <div className="one">
            <Text>정답: </Text>
           <input
            className="solution"
            value={solution}
            onChange={(e) => onEditProblem('solution', e)}
          />
          </div>
          <div className="one">
            <Text>해설: </Text>
          <input
            className="solutionContents"
            value={solutionContents}
            onChange={(e) => onEditProblem('solutionContents', e)}
          />
          </div>

        </div>
      </div>
    );
  }
}

export default Problem;