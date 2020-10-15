import React, { PureComponent } from 'react';
import { Form, Modal, Button, Popup, Icon, Grid } from 'semantic-ui-react';
import MathTutorial from '../../student/problem/solutionInput/MathTutorial';
import { MathPreview } from './MathPreview';

import { parseLatex } from '../../../constants/delimeters';

export default class EditProblem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: props.isNew ? false : props.problemNumber === 0,
      isOptional: props.isNew ? false : props.problem.isOptional,
      isMath: props.isNew ? false : props.problem.isMath,
      hasImage: props.isNew ? false : props.image,

      open: false,
      file: '',
      previewURL: '',

      problemNumber: props.isNew ? undefined : props.problem.problemNumber,
      title: props.isNew
        ? ''
        : props.problem.isMath
        ? parseLatex(props.problem.title)
        : props.problem.title,
      content: props.isNew
        ? ''
        : props.problem.isMath
        ? parseLatex(props.problem.content)
        : props.problem.content,
      answer: props.isNew
        ? ''
        : props.problem.isMath && !props.problem.isOptional
        ? parseLatex(props.problem.answer)
        : props.problem.answer,
      solution: props.isNew
        ? ''
        : props.problem.isMath
        ? parseLatex(props.problem.solution)
        : props.problem.solution,
      image: props.isNew ? '' : props.problem.image,

      option1: props.isNew
        ? undefined
        : props.problem.isMath
        ? parseLatex(props.problem.option1)
        : props.problem.option1,
      option2: props.isNew
        ? undefined
        : props.problem.isMath
        ? parseLatex(props.problem.option2)
        : props.problem.option2,
      option3: props.isNew
        ? undefined
        : props.problem.isMath
        ? parseLatex(props.problem.option3)
        : props.problem.option3,
      option4: props.isNew
        ? undefined
        : props.problem.isMath
        ? parseLatex(props.problem.option4)
        : props.problem.option4,
      option5: props.isNew
        ? undefined
        : props.problem.isMath
        ? parseLatex(props.problem.option5)
        : props.problem.option5,
    };
  }
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleHasContent = () => this.setState({ hasContent: !this.state.hasContent });
  handleIsOptional = () => this.setState({ isOptional: !this.state.isOptional });
  handleIsMath = () => this.setState({ isMath: !this.state.isMath });
  handleHasImage = () => this.setState({ hasImage: !this.state.hasImage });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { subChapterId, isNew, handleEdit } = this.props;
    const { requestProblemList, createProblem, updateProblem } = this.props;
    let formValue = {};

    const { hasContent, isOptional, isMath, hasImage, previewURL } = this.state;
    const { problemNumber, answer, title, content, solution } = this.state;
    const { option1, option2, option3, option4, option5 } = this.state;

    formValue = {
      content: isMath ? JSON.stringify(content) : content,
      image: hasImage ? previewURL : '',
      isMath: isMath,
      solution: isMath ? JSON.stringify(solution) : solution,
      title: isMath ? JSON.stringify(title) : title,
      problemNumber: hasContent ? 0 : problemNumber,
      isOptional: hasContent ? false : isOptional,
      answer: hasContent ? '' : isMath ? JSON.stringify(answer) : answer,
    };
    if (isOptional && !hasContent) {
      formValue = {
        ...formValue,
        option1: isMath ? JSON.stringify(option1) : option1,
        option2: isMath ? JSON.stringify(option2) : option2,
        option3: isMath ? JSON.stringify(option3) : option3,
        option4: isMath ? JSON.stringify(option4) : option4,
        option5: isMath ? JSON.stringify(option5) : option5,
      };
    }

    if (isNew) {
      createProblem({ ...formValue, subChapterId: subChapterId }, () => {
        requestProblemList({ subChapterId });
        handleEdit();
      });
    } else {
      const { problem } = this.props;
      updateProblem(problem.problemId, { ...formValue, subChapterId: subChapterId }, () => {
        requestProblemList({ subChapterId });
        handleEdit();
      });
    }
  };

  handleFileOnChange = (event) => {
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

  render() {
    const { hasContent, isOptional, isMath, hasImage, file, previewURL } = this.state;
    const { problemNumber, answer, title, content, solution } = this.state;
    const { option1, option2, option3, option4, option5 } = this.state;

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
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Button.Group floated="right">
            <Form.Button
              color="grey"
              icon="cancel"
              content="취소"
              onClick={() => this.props.handleEdit()}
            />
            <Button.Or />
            <Form.Button color="orange" type="submit" icon="save" content="저장" />
          </Button.Group>
          <Form.Group inline>
            <label>문제 유형 선택</label>
            <Form.Checkbox
              label="이어진 문제의 지문이에요"
              checked={hasContent}
              onClick={this.handleHasContent}
            />
            <Form.Checkbox
              label="객관식 문제"
              checked={isOptional}
              onClick={this.handleIsOptional}
            />
            <Form.Checkbox
              label="수식이 포함되어 있어요"
              checked={isMath}
              onClick={this.handleIsMath}
            />
            <Popup
              content="수식 입력 방법이 궁금해요"
              trigger={
                <div onClick={this.show} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Icon fitted size="large" name="question circle outline" />
                </div>
              }
            />
          </Form.Group>

          {!hasContent ? (
            <Form.Input
              required
              label="문제 번호"
              name="problemNumber"
              value={problemNumber}
              onChange={this.handleChange}
              placeholder="문제 번호를 숫자로 입력해 주세요."
            />
          ) : null}
          <Form.Input
            label="문제 제목"
            name="title"
            value={title}
            onChange={this.handleChange}
            placeholder="문제의 제목을 입력해 주세요."
          />
          {isMath ? <MathPreview mathContent={title} /> : null}
          <Form.Checkbox
            label={hasImage ? '그림 첨부 취소하기' : '문제 내용에 그림이 있어요'}
            checked={hasImage}
            onClick={this.handleHasImage}
          />
          {hasImage ? (
            <Grid>
              <Grid.Column width={5}>
                <Form.Input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  name="mySolutionImage"
                  onChange={this.handleFileOnChange}
                />
              </Grid.Column>
              <Grid.Column>{solution_preview}</Grid.Column>
            </Grid>
          ) : null}
          <Form.TextArea
            label="문제 내용"
            name="content"
            value={content}
            onChange={this.handleChange}
            placeholder="문제의 지문을 입력해 주세요."
          />
          {isMath ? <MathPreview mathContent={content} /> : null}
          {isOptional ? (
            <>
              <Form.Input
                label="1번"
                name="option1"
                value={option1}
                onChange={this.handleChange}
                placeholder="1번 객관식 지문의 내용을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={option1} /> : null}
              <Form.Input
                label="2번"
                name="option2"
                value={option2}
                onChange={this.handleChange}
                placeholder="2번 객관식 지문의 내용을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={option2} /> : null}
              <Form.Input
                label="3번"
                name="option3"
                value={option3}
                onChange={this.handleChange}
                placeholder="3번 객관식 지문의 내용을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={option3} /> : null}
              <Form.Input
                label="4번"
                name="option4"
                value={option4}
                onChange={this.handleChange}
                placeholder="4번 객관식 지문의 내용을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={option4} /> : null}
              <Form.Input
                label="5번"
                name="option5"
                value={option5}
                onChange={this.handleChange}
                placeholder="5번 객관식 지문의 내용을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={option5} /> : null}
            </>
          ) : null}

          {hasContent ? null : isOptional ? (
            <Form.Group inline>
              <Form.Field label="문제 정답" required />
              <Form.Radio
                label="1"
                value={1}
                name="answer"
                checked={answer === 1}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="2"
                value={2}
                name="answer"
                checked={answer === 2}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="3"
                value={3}
                name="answer"
                checked={answer === 3}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="4"
                value={4}
                name="answer"
                checked={answer === 4}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="5"
                value={5}
                name="answer"
                checked={answer === 5}
                onChange={this.handleChange}
              />
            </Form.Group>
          ) : (
            <>
              <Form.Input
                required
                label="문제 정답"
                name="answer"
                value={answer}
                onChange={this.handleChange}
                placeholder="주관식 문제의 정답을 입력해 주세요."
              />
              {isMath ? <MathPreview mathContent={answer} /> : null}
            </>
          )}
          <Form.TextArea
            label="문제 해설"
            name="solution"
            value={solution}
            onChange={this.handleChange}
            placeholder="문제의 해설을 입력해 주세요."
          />
          {isMath ? <MathPreview mathContent={solution} /> : null}
        </Form>
        <Modal dimmer="inverted" open={this.state.open} onClose={this.close}>
          <MathTutorial />
          <Modal.Actions>
            <Button positive icon="checkmark" content="알겠어요" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
