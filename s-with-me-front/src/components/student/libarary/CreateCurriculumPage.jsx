import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, TextArea, Icon } from 'semantic-ui-react';
import Form from '../../../common-ui/Form';
import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import Select, { Option } from '../../../common-ui/Select';
import Input from '../../../common-ui/Input';
import SelectSubChapter from './SelectSubChapter';

export default class CreateCurriculumPage extends PureComponent {
  static propTypes = {
    createCurriculum: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = { open: false, deleteOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  deleteShow = () => this.setState({ deleteOpen: true });
  deleteClose = () => this.setState({ deleteOpen: false });
  handleMonthlyGoal = (e, { value }) => this.setState({ monthlyGoal: value });
  handleSubmit(values) {
    const { myBookId, createCurriculum, updateCurriculum } = this.props;
    const { type, curriculum } = this.props;
    let formValue = {};
    if (values.curriculumType === 'monthly') {
      formValue = {
        type: 'monthly',
        monthlyGoal: this.state.monthlyGoal,
      };
    } else if (values.curriculumType === 'weekly') {
      formValue = {
        type: 'weekly',
        subChapterId: values.selectSubChapterId,
      };
    } else if (values.curriculumType === 'daily') {
      formValue = {
        type: 'daily',
        dailyGoal: values.curriculumGoalNumber,
      };
    }
    if (formValue && type === 'new') {
      createCurriculum({ ...formValue, myBookId: myBookId }, () => {
        this.close();
      });
    }
    if (formValue && type === 'old') {
      updateCurriculum(curriculum.curriculumId, { ...formValue, myBookId: myBookId }, () => {
        this.close();
      });
    }
  }
  handleDelete() {
    const { curriculum, deleteCurriculum } = this.props;
    deleteCurriculum(curriculum.curriculumId, () => {
      this.props.setUpdate();
      this.deleteClose();
    });
  }

  render() {
    const { open, deleteOpen } = this.state;
    return (
      <div>
        {this.props.type === 'new' ? (
          <Button
            basic
            size="tiny"
            color="green"
            content="새로운 목표 설정하기"
            onClick={this.show}
          />
        ) : (
          <React.Fragment>
            <Button basic size="tiny" color="green" content="목표 수정하기" onClick={this.show} />
            <Button
              basic
              color="red"
              size="tiny"
              content="목표 삭제하기"
              onClick={this.deleteShow}
            />
          </React.Fragment>
        )}
        <Modal basic size="small" open={deleteOpen}>
          <Modal.Content>
            <p>정말로 커리큘럼을 삭제하시겠습니까?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="yellow" inverted onClick={this.deleteClose}>
              <Icon name="redo" /> 취소
            </Button>
            <Button color="red" inverted onClick={this.handleDelete}>
              <Icon name="remove" /> 삭제할래요
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal dimmer="inverted" open={open} onClose={() => this.close()}>
          <Form onSubmit={values => this.handleSubmit(values)}>
            <Form.Consumer>
              {({ onChange, values }) => (
                <Modal.Content>
                  <Spacing horizontal={4} vertical={8}>
                    <Text xlarge bold>
                      커리큘럼 설정
                    </Text>
                    <Spacing bottom={2}>
                      <Select name="curriculumType" onChange={onChange}>
                        <Option label="선택해 주세요" value="" />
                        <Option label="월별 커리큘럼" value="monthly" />
                        <Option label="주별 커리큘럼" value="weekly" />
                        <Option label="일별 커리큘럼" value="daily" />
                      </Select>
                    </Spacing>
                    {values.curriculumType === 'daily' ? (
                      <Spacing bottom={2}>
                        <Text>매일 풀 목표 문제 수를 입력해주세요!</Text>
                        <Input name="curriculumGoalNumber" onChange={onChange} type="number" />
                      </Spacing>
                    ) : values.curriculumType === 'weekly' ? (
                      <Spacing bottom={2}>
                        <Text large>이번 주에 풀 소단원을 선택해주세요!</Text>
                        <div style={{ display: 'flex' }}>
                          <Select name="selectMainChapterId" onChange={onChange}>
                            <Option label="선택해 주세요" value="" />
                            {this.props.chapterList.map(({ mainChapter }, index) => (
                              <Option
                                key={index}
                                label={mainChapter.mainChapterName}
                                value={mainChapter.mainChapterId}
                              />
                            ))}
                          </Select>
                          <SelectSubChapter
                            chapterList={this.props.chapterList}
                            mainChapterId={values.selectMainChapterId}
                            onChange={onChange}
                          />
                        </div>
                      </Spacing>
                    ) : values.curriculumType === 'monthly' ? (
                      <Spacing bottom={2}>
                        <TextArea
                          placeholder="이번 달 다짐(목표)를 입력해 주세요."
                          onChange={this.handleMonthlyGoal}
                          style={{ minHeight: 100, width: '100%' }}
                        />
                      </Spacing>
                    ) : null}
                  </Spacing>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 10 }}>
                    <Button color="black" onClick={this.close} content="취소" />
                    <Button
                      positive
                      type="submit"
                      icon="checkmark"
                      onClick={this.props.setUpdate}
                      labelPosition="right"
                      content="확인"
                    />
                  </div>
                </Modal.Content>
              )}
            </Form.Consumer>
          </Form>
        </Modal>
      </div>
    );
  }
}
