import React from 'react';
import './ProblemList.css';
import ProblemItem from './ProblemItem';

class ProblemList extends React.Component {
  render() {
    const { newProblems,Problems, ActiveId, onListProblemClick} = this.props;
    console.log(newProblems);
    console.log(Problems);
    return (
      <div className="problemList">

        {newProblems.map((item) => {
          const { problemId, problemNumber,problemText,solution,solutionContents, Sid } = item;
          return (
            <ProblemItem
              key={problemId}
              problemId={problemId}
              Sid={Sid}
              active={problemId === ActiveId}
              problemNumber={problemNumber}
              problemText={problemText}
              solution={solution}
              solutionContents={solutionContents}
              onClick={() => onListProblemClick(problemId)}
            />
            
          );
        })}
      </div>
    );
  }
}

export default ProblemList;