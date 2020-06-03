import React, { PureComponent } from 'react';

import Card from '../../../common-ui/Card';
import Table from '../../../common-ui/table/Table';
import TableBody from '../../../common-ui/table/TableBody';
import TableRow from '../../../common-ui/table/TableRow';
import TableCell from '../../../common-ui/table/TableCell';

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
      <Card>
        <Table>
          <TableBody>
            <TableRow isHeader>
              <TableCell align="center">이 달의 목표</TableCell>
            </TableRow>
            <TableRow>
              {monthlyCurriculumList.length > 0 ? (
                monthlyCurriculumList.map(({ monthlyGoal, myBookId }) => (
                  <TableCell align="center">
                    <Link
                      to={`/library/myBook/${myBookId}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {monthlyGoal}
                    </Link>
                  </TableCell>
                ))
              ) : (
                <TableCell align="center">목표 없음</TableCell>
              )}
            </TableRow>

            <TableRow isHeader>
              <TableCell align="center">이 주의 목표</TableCell>
            </TableRow>

            {weeklyCurriculumList.length > 0 ? (
              weeklyCurriculumList.map(curriculum => (
                <SubChapterCurriculum curriculum={curriculum} />
              ))
            ) : (
              <TableRow>
                <TableCell align="center">목표 없음</TableCell>
              </TableRow>
            )}

            <TableRow isHeader>
              <TableCell align="center" isHeader>
                오늘의 목표
              </TableCell>
            </TableRow>

            {dailyCurriculumList.length > 0 ? (
              dailyCurriculumList.map(({ dailyGoal, myBookId }) => (
                <TableRow>
                  <TableCell align="center">
                    <Link
                      to={`/library/myBook/${myBookId}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {dailyGoal}문제 풀기
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center">목표 없음</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
