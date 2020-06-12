import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';

export default class LibrarySubjectTable extends PureComponent {
  handleClick = (e, { name }) => {
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestFilteredMyBookList } = this.props;
    requestFilteredMyBookList('SUBJECT', { subject: name }, studentId);
  };
  render() {
    return (
      <Menu vertical>
        {this.props.subjectList.map((subject, index) => (
          <Menu.Item key={index} onClick={this.handleClick} name={subject}>
            {subject}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
