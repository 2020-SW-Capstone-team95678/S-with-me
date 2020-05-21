
import React from 'react';
import './AddProblemApp.css';
import ProblemHeader from './ProblemHeader';
import Problem from './Problem';
import ProblemList from './ProblemList';
import { generateId } from '../utils';

class AddProblemApp extends React.Component {
   
  state = {
    Problems: [  ],
    ActiveId: null,
  }

  handleListProblemClick = (ProblemId) => {

    this.setState({ ActiveId: ProblemId });
  }

  handleAddProblem = () => {
    const ProblemId = generateId();
    const {SchapId}=this.props;
    console.log(SchapId);
    this.setState({
      Problems: [
        ...this.state.Problems,
        {
          Sid: SchapId,
          problemId: ProblemId,
          problemNumber : '번호',
          problemText : '문제를 입력하세요.',
          solution: '문제의 정답을 입력하세요.',
          solutionContents: '문제의 해설을 입력하세요.',
        },
      ],
      ActiveId: ProblemId,
    });
    console.log(this.state);
  }

  handleDeleteProblem = () => {
    const Problems = this.state.Problems.filter((item) => item.problemId !== this.state.ActiveId);
    this.setState({
      Problems,
      ActiveId: Problems.length === 0 ? null : Problems[0].problemId,
    });
  }

  handleEditProblem = (type, e) => {
    const Problems = [ ...this.state.Problems ];
    const Problem = Problems.find((item) => item.problemId === this.state.ActiveId)
    Problem[type] = e.target.value;
    this.setState({
      Problems,
    });
  }

 
  render() {
    const { Problems, ActiveId, SchapId} = this.state;
    const activeProblem = Problems.filter((item) => item.problemId === ActiveId)[0];
    console.log(activeProblem);
    const newProblems = Problems.filter((item) => item.Sid === this.props.SchapId);
    
    return (
      <div className="problemApp">
          <ProblemHeader
          onAddProblem={this.handleAddProblem}
          onDeleteProblem={this.handleDeleteProblem}
          />

        <div className="container">
            {/* <ProblemList
            Problems={Problems}
            ActiveId={ActiveId}
            onListItemClick={this.handleListSubItemClick}
            SchapId={SchapId}
            newProblems={newProblems}
            />  */}
          
            <ProblemList
            Problems={Problems}
            ActiveId={ActiveId}
            onListProblemClick={this.handleListProblemClick}
            SchapId={SchapId}
            newProblems={newProblems}
             />
            {
            Problems.length !== 0 && activeProblem.Sid === this.props.SchapId &&  <Problem Problem={activeProblem} onEditProblem={this.handleEditProblem} />
            }


        </div>
        
        
      </div>
    );
  }
}

export default AddProblemApp;