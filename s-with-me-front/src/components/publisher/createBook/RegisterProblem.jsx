import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import Text from '../../../common-ui/Text';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import Api from '../../../Api';

import 'katex/dist/katex.min.css';
import {ProblemInputMathTop,ProblemInputMathBottom} from './ProblemInputMath';
import { TextArea } from 'semantic-ui-react';

export default class RegisterProblem extends PureComponent {
  constructor(props) {
    super(props);
    const { subChapterId } = props;
    console.log(subChapterId);

    this.state = {
      content: '',
      solution: '',
      isOptional: false,
      file: '',
      previewURL: '',
      isMath: false,
      delimeters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
    };
  }

  handleSubmit = (values, subChapterId) => {
    if(this.state.isMath){

      values = {
        ...values,
        option1:JSON.stringify(this.state.optionOneM),
        option2:JSON.stringify(this.state.optionTwoM),
        option3:JSON.stringify(this.state.optionThrM),
        option4:JSON.stringify(this.state.optionFouM),
        option5:JSON.stringify(this.state.optionFivM),
        isMath: this.state.isMath,
        title: JSON.stringify(this.state.titleM),
        content:JSON.stringify( this.state.contentM),
        answer: this.state.answerM,
        solution: JSON.stringify(this.state.solutionM),
      };

    }
    else{
      values = {
        ...values,
        content:this.state.content,
        solution:this.state.solution,
      };

    }
    const formValue = {
      ...values,
      subChapterId:subChapterId,
      image: this.state.previewURL,
      isOptional: this.state.isOptional,
      isMath:this.state.isMath,
    };
    console.log(formValue);
    Api.post('/publisher/library/book/main-chapter/sub-chapter/problem', formValue)
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error.message));
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
    if(optionFou){
    this.setState({
      optionFouM:optionFou
    });
  }
  };

  handleOptionFiv = optionFiv => {
    this.setState({
      optionFivM:optionFiv

    });
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  render() {
    const { file, previewURL, isOptional, isMath } = this.state;
    const { subChapterId } = this.props;
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
      <div>
        <Form onSubmit={values => this.handleSubmit(values, subChapterId)} initValues="">
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
                      <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                      <ProblemInputMathTop
                        isMath={this.state.isMath}
                        onContent={this.handleContent}
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
                    <Button>등록!</Button>
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
                      <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                      <Input label="문제 제목" name="title" onChange={onChange} />
                      문제 내용
                              <textarea
                                label="문제 내용"
                                name="content"
                                value={this.state.content}
                                onChange={this.handleChangeInput}
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

                      {isOptional ? (
                        <div>
                          <Input label="객관식 1번" name="option1" onChange={onChange} />
                          <Input label="객관식 2번" name="option2" onChange={onChange} />
                          <Input label="객관식 3번" name="option3" onChange={onChange} />
                          <Input label="객관식 4번" name="option4" onChange={onChange} />
                          <Input label="객관식 5번" name="option5" onChange={onChange} />
                        </div>
                      ) : null}

                      <Input label="문제 정답" name="answer" onChange={onChange} />
                      문제 해설
                              <textarea
                                label="문제 해설"
                                name="solution"
                                value={this.state.solution}
                                onChange={this.handleChangeInput}
                              />
                    </div>
                    <Button>등록!</Button>
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
    );
  }
}
