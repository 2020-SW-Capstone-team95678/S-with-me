import React, { PureComponent } from 'react';
import OverflowScrolling from 'react-overflow-scrolling';
import './ModifyProblem.css';

import Form from '../../../common-ui/Form';

import {Button, Checkbox} from 'semantic-ui-react';
import Api from '../../../Api';
import { Consumer as Modal } from '../../../common-ui/Modal/context';

import 'katex/dist/katex.min.css';
import { ProblemInputMathTop, ProblemInputMathBottom } from './ProblemInputMath';

export default class ModifyProblem extends PureComponent {
  constructor(props) {
    super(props);
    const { problem } = props;

    if (problem.isMath) {
      this.state = {
        content: JSON.parse(problem.content),
        answer: problem.answer,
        image: problem.image,
        option1: JSON.parse(problem.option1),
        option2: JSON.parse(problem.option2),
        option3: JSON.parse(problem.option3),
        option4: JSON.parse(problem.option4),
        option5: JSON.parse(problem.option5),
        problemNumber: problem.problemNumber,
        problemId:problem.problemId,
        solution: JSON.parse(problem.solution),
        title: JSON.parse(problem.title),
        subChapterId: problem.subChapterId,

        isOptional: problem.isOptional,
        isMath: problem.isMath,
        file: '',
        previewURL: problem.image,
        delimeters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
      };
    } else {
      this.state = {
        problemId:problem.problemId,
        content: problem.content,
        answer: problem.answer,
        image: problem.image,
        option1: problem.option1,
        option2: problem.option2,
        option3: problem.option3,
        option4: problem.option4,
        option5: problem.option5,
        problemNumber: problem.problemNumber,
        solution: problem.solution,
        title: problem.title,
        subChapterId: problem.subChapterId,

        isOptional: problem.isOptional,
        isMath: problem.isMath,
        file: '',
        previewURL: problem.image,
        delimeters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\(', right: '\\)', display: false },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
      };
    }
  }

  handleSubmit = (values, problemId, subChapterId, closeModal) => {
    const isMath = this.state.isMath;

    if (isMath) {
      const formValue = {
        option1: JSON.stringify(this.state.option1),
        option2: JSON.stringify(this.state.option2),
        option3: JSON.stringify(this.state.option3),
        option4: JSON.stringify(this.state.option4),
        option5: JSON.stringify(this.state.option5),
        title: JSON.stringify(this.state.title),
        content: JSON.stringify(this.state.content),
        answer: this.state.answer,
        solution: JSON.stringify(this.state.solution),
        problemNumber: this.state.problemNumber,

        subChapterId: this.state.subChapterId,
        image: this.state.previewURL,
        isOptional: this.state.isOptional,
      };

      Api.put(`/publisher/library/book/main-chapter/sub-chapter/problem/${problemId}`, formValue)
        .then(({ data }) => console.log(data),
        this.props.doneCallback({
          formValue
        }),)

        .catch(error => console.log(error.message));
    } else {
      const formValue = {
        option1: this.state.option1,
        option2: this.state.option2,
        option3: this.state.option3,
        option4: this.state.option4,
        option5: this.state.option5,
        title: this.state.title,
        content: this.state.content,
        answer: this.state.answer,
        solution: this.state.solution,
        problemNumber: this.state.problemNumber,

        subChapterId: this.state.subChapterId,
        image: this.state.previewURL,
        isOptional: this.state.isOptional,
      };

      Api.put(`/publisher/library/book/main-chapter/sub-chapter/problem/${problemId}`, formValue)

        .then(({ data }) => console.log(data),
        this.props.doneCallback({
          formValue
        }),
        
        )

        .catch(error => console.log(error.message));
    }
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
      content: content,
    });
  };
  handleTitle = title => {
    this.setState({
      title: title,
    });
  };
  handleSolution = solution => {
    this.setState({
      solution: solution,
    });
  };
  handleAnswer = answer => {
    this.setState({
      answer: answer,
    });
  };

  handleOptionOne = optionOne => {
    this.setState({
      option1: optionOne,
    });
  };

  handleOptionTwo = optionTwo => {
    this.setState({
      option2: optionTwo,
    });
  };

  handleOptionThr = optionThr => {
    this.setState({
      option3: optionThr,
    });
  };

  handleOptionFou = optionFou => {
    this.setState({
      option4: optionFou,
    });
  };

  handleOptionFiv = optionFiv => {
    this.setState({
      option5: optionFiv,
    });
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { file, previewURL, isOptional, isMath,problemId } = this.state;
    const {  subChapterId, problem } = this.props;
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
      <OverflowScrolling style={{ maxHeight: 800 }} className="overflow-scrolling">
        <Modal>
          {({ closeModal }) => (
            <div>
              <Form
                onSubmit={values => this.handleSubmit(values, problemId, subChapterId, closeModal)}
                initValues=""
              >
                <Form.Consumer>
                  {({ onChange, values }) => (
                    <div style={{ overflow: 'outo', display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ display: 'flex', flexDirection: 'column',  }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Checkbox
                            label="수식 입력하기"
                            onChange={() => this.setState({ isMath: !isMath })}
                            checked={isMath}
                          />
                        </div>
                        <br />
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
                              <input
                                label="문제 번호"
                                value={this.state.problemNumber}
                                onChange={this.handleChangeInput}
                                name="problemNumber"
                              />

                              <ProblemInputMathTop
                                isMath={this.state.isMath}
                                onContent={this.handleContent}
                                prevContent={this.state.content}
                                prevTitle={this.state.title}
                                onTitle={this.handleTitle}
                              />

                              <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                                <p>변경할 사진을 첨부해주세요.↓↓↓↓</p>
                                <img
                                  width={100}
                                  src={problem.image}
                                  alt="첨부된 사진이 없습니다."
                                />
                                <input
                                  type="file"
                                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                                  name="mySolutionImage"
                                  onChange={this.handleFileOnChange}
                                />
                                {solution_preview}
                              </div>

                              <Checkbox
                                label="객관식 문제입니까?"
                                onChange={() => this.handleOptional()}
                                checked={isOptional}
                              />

                              <ProblemInputMathBottom
                                isMath={this.state.isMath}
                                isOptional={this.state.isOptional}
                                onSolution={this.handleSolution}
                                onAnswer={this.handleAnswer}
                                onOptionOne={this.handleOptionOne}
                                onOptionTwo={this.handleOptionTwo}
                                onOptionThr={this.handleOptionThr}
                                onOptionFou={this.handleOptionFou}
                                onOptionFiv={this.handleOptionFiv}
                                prevSolution={this.state.solution}
                                prevAnswer={this.state.answer}
                                prevOptionOne={this.state.optionOne}
                                prevOptionTwo={this.state.optionTwo}
                                prevOptionThr={this.state.optionThr}
                                prevOptionFou={this.state.optionFou}
                                prevOptionFiv={this.state.optionFiv}
                              />
                            </div>

                            <Button style={{marginBottom:5, flex:1}}>수정</Button>
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
                              문제 번호
                              <input
                                label="문제 번호"
                                value={this.state.problemNumber}
                                onChange={this.handleChangeInput}
                                name="problemNumber"
                              />
                              문제 제목
                              <input
                                label="문제 제목"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChangeInput}
                              />
                              문제 내용
                              <textarea
                                label="문제 내용"
                                name="content"
                                value={this.state.content}
                                onChange={this.handleChangeInput}
                              />
                              <div style={{ display: 'flex', padding: 3, flexDirection: 'column' }}>
                                <p>변경할 사진을 첨부해주세요.↓↓↓↓</p>
                                <img
                                  width={100}
                                  src={problem.image}
                                  alt="첨부된 사진이 없습니다."
                                />
                                <input
                                  type="file"
                                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                                  name="mySolutionImage"
                                  onChange={this.handleFileOnChange}
                                />
                                {solution_preview}
                              </div>

                              <Checkbox

                                label="객관식 문제입니까?"
                                onChange={() => this.handleOptional()}
                                checked={isOptional}
                              />
                              {isOptional ? (
                                <div>
                                  객관식 1번
                                  <input
                                    label="객관식 1번"
                                    value={this.state.optionOne}
                                    onChange={this.handleChangeInput}
                                    name="option1"
                                  />
                                  <br />
                                  객관식 2번
                                  <input
                                    label="객관식 2번"
                                    value={this.state.optionTwo}
                                    onChange={this.handleChangeInput}
                                    name="option2"
                                  />
                                  <br />
                                  객관식 3번
                                  <input
                                    label="객관식 3번"
                                    value={this.state.onOptionThr}
                                    onChange={this.handleChangeInput}
                                    name="option3"
                                  />
                                  <br />
                                  객관식 4번
                                  <input
                                    label="객관식 4번"
                                    value={this.state.optionFou}
                                    onChange={this.handleChangeInput}
                                    name="option4"
                                  />
                                  <br />
                                  객관식 5번
                                  <input
                                    label="객관식 5번"
                                    value={this.state.optionFiv}
                                    onChange={this.handleChangeInput}
                                    name="option5"
                                  />
                                </div>
                              ) : null}
                              문제 정답
                              <input
                                label="문제 정답"
                                value={this.state.answer}
                                onChange={this.handleChangeInput}
                                name="answer"
                              />
                              문제 해설
                              <textarea
                                label="문제 해설"
                                value={this.state.solution}
                                onChange={this.handleChangeInput}
                                name="solution"
                              />
                            </div>
                            <div >
                              <Button style={{marginBottom:5, flex:1}}>수정</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Form.Consumer>
              </Form>
              <Button
                onClick={() => {
                  closeModal();
                }}
              >
                닫기
              </Button>
            </div>
          )}
        </Modal>
      </OverflowScrolling>
    );
  }
}
