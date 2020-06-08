import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import Api from '../../../Api';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import 'katex/dist/katex.min.css';
import {ProblemInputMathTop,ProblemInputMathBottom} from './ProblemInputMath';

export default class ModifyProblem extends PureComponent {
  constructor(props) {
    super(props);
    const { subChapterId,problem } = props;
    console.log(problem);

    this.state = {
        content:problem.content,
        answer:problem.answer,
        image:problem.image,
        option1:problem.option1,
        option2:problem.option2,
        option3:problem.option3,
        option4:problem.option4,
        option5:problem.option5,
        problemNumber:problem.problemNumber,
        solution:problem.solution,
        title:problem.title,

        
      subChapterId:subChapterId,
      isOptional: problem.isOptional,
      isMath: problem.isMath,
        file: '',
        previewURL: '',
        delimeters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
    }
    
    console.log(this.state.content);
  }
  

  handleSubmit = (values, problemId,subChapterId) => {
    
     const formValueM = {
        option1:this.state.optionOneM,
        option2:this.state.optionTwoM,
        option3:this.state.optionThrM,
        option4:this.state.optionFouM,
        option5:this.state.optionFivM,
        isMath: this.state.isMath,
        title: this.state.titleM,
        content: this.state.contentM,
        answer: this.state.answerM,
        solution: this.state.solutionM,
        problemNumber:this.state.problemNumber,
        subChapterId:subChapterId,
      image: this.state.previewURL,
      isOptional: this.state.isOptional
      };

      

    const formValue = {
        option1:this.state.option1,
        option2:this.state.option2,
        option3:this.state.option3,
        option4:this.state.option4,
        option5:this.state.option5,
        title: this.state.title,
        content: this.state.content,
        answer: this.state.answer,
        solution: this.state.solution,
        problemNumber:this.state.problemNumber,

      subChapterId:subChapterId,
      image: this.state.previewURL,
      isOptional: this.state.isOptional,
    };

    console.log(values);
    console.log(formValue);
    {this.state.isMath?(Api.put(`/publisher/library/book/mainChapter/subChapter/problem/${problemId}`, formValue)
    .then(({ data }) => console.log(data))
    .catch(error => console.log(error.message))):(Api.put(`/publisher/library/book/mainChapter/subChapter/problem/${problemId}`, formValueM)
    .then(({ data }) => console.log(data))
    .catch(error => console.log(error.message)))}

  };

  handleOptional = () => {
    const { isOptional } = this.state;
    this.setState({ isOptional: !isOptional });
  };

  handleFileOnChange = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleContent = content => {
    this.setState({
      contentM: content,
    });
  };
  handleTitle = title => {
    this.setState({
      titleM: title,
    });
  };
  handleSolution = solution => {
    this.setState({
      solutionM:solution,
    });
  };
  handleAnswer = answer => {
    this.setState({
      answerM:answer,
    });
  };

  handleOptionOne = optionOne=> {
    this.setState({
      optionOneM:optionOne
    });
  };

  handleOptionTwo = optionTwo => {
    this.setState({
      optionTwoM:optionTwo
    });
  };

  handleOptionThr = optionThr  => {
    this.setState({
     optionThrM:optionThr
    });
  };

  handleOptionFou = optionFou=> {
    this.setState({
      optionFouM:optionFou
    });
  };

  handleOptionFiv = optionFiv => {
    this.setState({
      optionFivM:optionFiv

    });
  };

  handleChangeInput=e=>{
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  render() {
    const { file, previewURL, isOptional, isMath } = this.state;
    const { problemId,subChapterId,problem } = this.props;
    let solution_preview = null;
    if (file) {
      solution_preview = (
        <img
          className="profile_preview"
          src={previewURL}
          alt="problem_imgae"
          style={{
            width: 200,
            maxHeight: 500,
            overflow: 'hidden',
          }}
        />
      );
    }

    return (
        
        <Modal>
      {({ closeModal }) => (
      <div>
        <Form onSubmit={values => this.handleSubmit(values, problemId,subChapterId)} initValues="">
          <Form.Consumer>
            {({ onChange, values }) => (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid' }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    
                    <CheckBox
                  label="수식 입력하기"
                  onChange={() => this.setState({ isMath: !isMath })}
                  checked={isMath}
                />
                  </div>
                  <br/>
                  {isMath ? (
                    <div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Button small>수식 입력 방법 보러 가기!</Button>
                      <input label="문제 번호" value={this.state.problemNumber} onChange=
                      {this.handleChangeInput} name="problemNumber"  />

                      <ProblemInputMathTop
                        isMath={this.state.isMath}
                        onContent={this.handleContent}
                        prevContent={this.state.content}
                        prevTitle={this.state.title}
                        onTitle={this.handleTitle}
                      />
                    
                      <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                        <p>문제에 사진이 있으면 첨부해주세요.↓↓↓↓</p>
                        <input
                          type="file"
                          accept="image/jpg,impge/png,image/jpeg,image/gif"
                          name="mySolutionImage"
                          onChange={this.handleFileOnChange}
                        />
                        {solution_preview}
                      </div>

                      <CheckBox
                        label="객관식 문제입니까?"
                        onChange={() => this.handleOptional()}
                        checked={isOptional}
                      />




                      <ProblemInputMathBottom
                        isMath={this.state.isMath}
                        isOptional={this.state.isOptional}
                        onContent={this.handleContent}
                        onTitle={this.handleTitle}
                        onSolution={this.handleSolution}
                        onAnswer={this.handleAnswer}
                        onOptionOne={this.handleOptionOne}
                        onOptionTwo={this.handleOptionTwo}
                        onOptionThr={this.handleOptionThr}
                        onOptionFou={this.handleOptionFou}
                        onOptionFiv={this.handleOptionFiv}
                        />
                        
                    </div>
                    <Button>수정</Button>
                    </div>


                  ) : (
                    <div>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <input label="문제 번호" value={this.state.problemNumber} onChange=
                      {this.handleChangeInput} name="problemNumber" />
                      <input label="문제 제목" name="title" value={this.state.title} onChange=
                      {this.handleChangeInput} />
                      <input label="문제 내용" name="content" value={this.state.content} onChange=
                      {this.handleChangeInput}/>
                      
                      <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                        <p>문제에 사진이 있으면 첨부해주세요.↓↓↓↓</p>
                        <input
                          type="file"
                          accept="image/jpg,impge/png,image/jpeg,image/gif"
                          name="mySolutionImage"
                          onChange={this.handleFileOnChange}
                        />
                        {solution_preview}
                      </div>

                      <CheckBox
                        label="객관식 문제입니까?"
                        onChange={() => this.handleOptional()}
                        checked={isOptional}
                      />

                      {isOptional ? (
                        <div>
                          <input label="객관식 1번" value={this.state.optionOne} onChange=
                      {this.handleChangeInput} name="option1"  />
                          <input label="객관식 2번" value={this.state.optionTwo} onChange=
                      {this.handleChangeInput} name="option2"  />
                          <input label="객관식 3번" value={this.state.onOptionThr} onChange=
                      {this.handleChangeInput} name="option3"  />
                          <input label="객관식 4번" value={this.state.optionFou} onChange=
                      {this.handleChangeInput} name="option4"  />
                          <input label="객관식 5번" value={this.state.optionFiv} onChange=
                      {this.handleChangeInput} name="option5"  />
                        </div>
                      ) : null}

                      <input label="문제 정답" value={this.state.answer} onChange=
                      {this.handleChangeInput} name="answer" />
                      <input label="문제 해설" value={this.state.solution} onChange=
                      {this.handleChangeInput} name="solution" />
                    </div>
                    <div>
                        <Button
            
            >
              수정
            </Button>
            <button
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </button>
                    </div>
                    
                    </div>
                  )}
                </div>

                {/* <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                <Input label="문제 제목" name="title" onChange={onChange} />
                <ProblemInputMath onContent={this.handleContent} label="문제 내용" name="content" /> */}

                
              </div>
            )}
          </Form.Consumer>
        </Form>
      </div>
      )}
      </Modal>
    );
  }
}

