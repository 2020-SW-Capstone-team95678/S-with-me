import React, { useState } from 'react';
import { subjects } from '../../../constants/subjects';

import { Menu, Dropdown, Button, Icon, Form } from 'semantic-ui-react';
import { isMobileOnly } from 'react-device-detect';

export default function BookstoreFilter(props) {
  const [filterGrade, setFilterGrade] = useState(0);
  const [filterSubject, setFilterSubject] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const subjectOptions = subjects.map((subject, index) => ({
    key: index,
    text: subject,
    value: subject,
  }));
  const { requestBookList, requestAdBookList, setBookstoreFilter } = props;
  const grade = window.sessionStorage.getItem('grade');
  const handleGrade = (e, { value }) => {
    setFilterGrade(value);
  };
  const handleSubject = (e, { value }) => {
    setFilterSubject(value);
  };
  const handleChange = (e, { value }) => {
    setSearchFilter(value);
  };
  const handleFilter = () => {
    if (filterGrade !== 0 && filterSubject) {
      setBookstoreFilter('BOTH', { subject: filterSubject, grade: filterGrade });
      requestBookList(filterGrade, filterSubject);
      requestAdBookList(filterGrade, filterSubject);
    } else if (filterGrade !== 0) {
      setBookstoreFilter('GRADE', { grade: filterGrade });
      requestBookList(filterGrade);
      requestAdBookList(filterGrade);
    } else if (filterSubject) {
      setBookstoreFilter('SUBJECT', { subject: filterSubject });
      requestBookList(grade, filterSubject);
      requestAdBookList(grade, filterSubject);
    } else {
      requestBookList(grade);
      requestAdBookList(grade);
    }
  };
  const handleSearch = () => {
    const { requestSearchResultList, setBookstoreFilter } = props;
    setBookstoreFilter('SEARCH', searchFilter);
    requestSearchResultList(searchFilter);
  };
  return (
    <Menu color="orange" fluid vertical={isMobileOnly}>
      <Dropdown
        item
        button
        placeholder="학년 선택"
        direction="left"
        onChange={handleGrade}
        options={[
          { key: 1, value: 1, text: '1학년' },
          { key: 2, value: 2, text: '2학년' },
          { key: 3, value: 3, text: '3학년' },
        ]}
      />
      <Dropdown
        item
        button
        placeholder="과목 선택"
        direction="left"
        onChange={handleSubject}
        options={subjectOptions}
      />
      <Menu.Item>
        <Button basic circular content="찾기" icon="search" color="orange" onClick={handleFilter} />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Form onSubmit={handleSearch}>
            <Form.Input
              icon={<Icon circular color="orange" name="search" />}
              placeholder="Search..."
              name="search"
              value={searchFilter}
              onChange={handleChange}
            />
          </Form>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
