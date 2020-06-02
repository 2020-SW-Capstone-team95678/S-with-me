import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Consumer as Modal } from '../../../common-ui/Modal/context';
import Form from '../../../common-ui/Form';
import Spacing from '../../../common-ui/Spacing';
import Text from '../../../common-ui/Text';
import Select, { Option } from '../../../common-ui/Select';
import Input from '../../../common-ui/Input';
import InlineList from '../../../common-ui/InlineList';
import Button from '../../../common-ui/Button';
import SelectSubChapter from './SelectSubChapter';

export default class CreateCurriculumPage extends PureComponent {
  static propTypes = {
    createCurriculum: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, closeModal) {
    const { myBookId, createCurriculum, updateCurriculum } = this.props;
    const { type, curriculum } = this.props;
    let formValue = {};
    if (values.curriculumType === 'monthly') {
      formValue = {
        type: 'monthly',
        monthlyGoal: values.monthlyGoal,
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
      createCurriculum({ ...formValue, myBookId: myBookId }, () => closeModal());
    }
    if (formValue && type === 'old') {
      updateCurriculum(curriculum.curriculumId, { ...formValue, myBookId: myBookId }, () =>
        closeModal(),
      );
    }
  }

  render() {
    return (
      <Modal>
        {({ closeModal }) => (
          <Form onSubmit={values => this.handleSubmit(values, closeModal)}>
            <Form.Consumer>
              {({ onChange, values }) => (
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
                          {this.props.chapterList.map(({ mainChapter }) => (
                            <Option
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
                      <Text>이번 달 다짐(목표)을 입력해주세요!</Text>
                      <Input name="monthlyGoal" onChange={onChange} />
                    </Spacing>
                  ) : null}
                  <InlineList spacingBetween={1}>
                    <Button primary>설정</Button>
                    <Button onPress={closeModal}>취소</Button>
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </Modal>
    );
  }
}
