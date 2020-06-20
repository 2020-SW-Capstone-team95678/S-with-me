import React, { PureComponent } from 'react';

import { List, Icon } from 'semantic-ui-react';
import Heading from '../../../common-ui/Heading';
import { Link } from 'react-router-dom';
import SubChapterCurriculum from './SubChapterCurriculum';

export default class CurriculumList extends PureComponent {
  render() {
    const monthlyCurriculumList = this.props.curriculumList.filter(
      curriculum => curriculum.type === 'monthly',
    );
    const weeklyCurriculumList = this.props.curriculumList.filter(
      curriculum => curriculum.type === 'weekly',
    );
    const dailyCurriculumList = this.props.curriculumList.filter(
      curriculum => curriculum.type === 'daily',
    );
    return (
      <div style={{ paddingLeft: 10 }}>
        <List relaxed>
          <List.Item>
            <List.Content verticalAlign="middle">
              <Heading level={4}>
                <Icon name="calendar alternate outline" verticalAlign="middle" />이 달의 목표
              </Heading>
            </List.Content>
          </List.Item>
          <List.Item>
            <List bulleted size="big" verticalAlign="top">
              {monthlyCurriculumList.length > 0 ? (
                monthlyCurriculumList.map(({ monthlyGoal, myBookId }, index) => (
                  <List.Item key={index}>
                    <List.Content verticalAlign="middle">
                      <Link to={`/library/myBook/${myBookId}`}>{monthlyGoal}</Link>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <List.Item>목표 없음</List.Item>
              )}
            </List>
          </List.Item>
          <List.Item>
            <List.Content verticalAlign="middle">
              <Heading level={4}>
                <Icon name="calendar minus outline" verticalAlign="middle" />이 주의 목표
              </Heading>
            </List.Content>
          </List.Item>
          <List.Item>
            <List bulleted size="big">
              {weeklyCurriculumList.length > 0 ? (
                weeklyCurriculumList.map((curriculum, index) => (
                  <SubChapterCurriculum curriculum={curriculum} key={index} />
                ))
              ) : (
                <List.Item>목표 없음</List.Item>
              )}
            </List>
          </List.Item>
          <List.Item>
            <List.Content verticalAlign="middle">
              <Heading level={4}>
                <Icon name="calendar check outline" verticalAlign="middle" />
                오늘의 목표
              </Heading>
            </List.Content>
          </List.Item>
          <List.Item>
            <List bulleted size="big">
              {dailyCurriculumList.length > 0 ? (
                dailyCurriculumList.map(({ dailyGoal, myBookId }, index) => (
                  <List.Item key={index}>
                    <List.Content verticalAlign="middle">
                      <Link to={`/library/myBook/${myBookId}`}>하루에 {dailyGoal}문제 풀기</Link>
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <List.Item>목표 없음</List.Item>
              )}
            </List>
          </List.Item>
        </List>
      </div>
    );
  }
}
