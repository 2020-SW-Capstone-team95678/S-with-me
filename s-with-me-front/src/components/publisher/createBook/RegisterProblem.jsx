import React, { PureComponent } from 'react';

import Form from '../../../common-ui/Form';
import Input from '../../../common-ui/Input';
import CheckBox from '../../../common-ui/CheckBox';
import Button from '../../../common-ui/Button';
import Api from '../../../Api';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import ProblemInputMath from './ProblemInputMath';

export default class RegisterProblem extends PureComponent {
  constructor(props) {
    super(props);
    const { subChapterId } = props;
    console.log(subChapterId);

    this.state = {
      isOptional: false,
      file: '',
      previewURL: '',
      showMath: false,
      delimeters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$', right: '$', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
    };
  }

  handleSubmit = (values, subChapterId) => {
    values = {
      ...values,
      title: JSON.stringify(values.title),
      content: this.state.content,
      answer: JSON.stringify(values.answer),
      solution: JSON.stringify(values.solution),
    };
    const formValue = {
      ...values,
      image: this.state.previewURL,
      isOptional: this.state.isOptional,
      subChapterId: subChapterId,
    };
    console.log(formValue);
    Api.post('/publisher/library/book/mainChapter/subChapter/problems', [formValue])
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

  handleContent = (content) =>{
    this.setState({
      content:content
    });
  }

  render() {
    const { file, previewURL, isOptional, showMath } = this.state;
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
                <Input label="문제 번호" name="problemNumber" onChange={onChange} />
                <Input label="문제 제목" name="title" onChange={onChange} />
                <ProblemInputMath onContent={this.handleContent} label="문제 내용" name="content"/>
                
                <CheckBox
                  label="객관식 문제입니까?"
                  onChange={() => this.handleOptional()}
                  checked={isOptional}
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
                <Input label="문제 해설" name="solution" onChange={onChange} />
                <Button>등록!</Button>
              </div>
            )}
          </Form.Consumer>
        </Form>
      </div>
    );
  }
}
