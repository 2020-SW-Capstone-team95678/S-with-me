
import React from 'react';
import './AddProblemApp.css';
import ProblemHeader from './ProblemHeader';
import ProblemItem from './ProblemItem';
import { generateId } from '../utils';

class AddProblemApp extends React.Component {
   
  state = {
    Problems: [  ],
    ActiveId: null,
  }

  handleListSubItemClick = (ProblemId) => {

    this.setState({ SubActiveId: ProblemId });
  }

  handleAddProblem = () => {
    const ProblemId = generateId();
    //console.log(ProblemId);
    this.setState({
      Problems: [
        ...this.state.Problems,
        {
          problemId: ProblemId,
          problemNumber : 'problemNumber',
          problemText : '문제를 입력하세요.',
          solution: '문제의 정답을 입력하세요.',
          solutioncContents: '문제의 해설을 입력하세요.',
        },
      ],
      SubActiveId: ProblemId,
    });
    console.log(this.state);
  }

  handleDeleteProblem = () => {
    const Problems = this.state.Problems.filter((item) => item.problemId !== this.state.SubActiveId);
    this.setState({
      Problems,
      SubActiveId: Problems.length === 0 ? null : Problems[0].problemId,
    });
  }

  handleEditProblem = (type, e) => {
    const Problems = [ ...this.state.Problems ];
    const Problem = Problems.find((item) => item.problemId === this.state.SubActiveId)
    Problem[type] = e.target.value;
    this.setState({
      Problems,
    });
  }

 
  render() {
    const { Problems, SubActiveId, problemId} = this.state;
    const activeProblem = Problems.filter((item) => item.problemId === SubActiveId)[0];
    console.log(activeProblem);
    
    return (
      <div className="problemApp">
          <ProblemHeader
          onAddProblem={this.handleAddProblem}
          onDeleteProblem={this.handleDeleteProblem}
          />

        <div className="container">
          

          {
            Problems.length !== 0&&  <ProblemItem
            Problems={Problems}
            onEditProblem={this.handleEditProblem}

          /> 
          }
        </div>
        
      </div>
    );
  }
}

export default AddProblemApp;