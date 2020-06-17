import React, { PureComponent } from 'react';
import { List } from 'semantic-ui-react';

export default class LibrarySubjectTable extends PureComponent {
  handleClick = (e, { name }) => {
    const studentId = window.sessionStorage.getItem('studentId');
    const { requestFilteredMyBookList } = this.props;
    requestFilteredMyBookList('SUBJECT', { subject: name }, studentId);
  };
  render() {
    return (
      <List divided verticalAlign="middle">
        {this.props.subjectList.map((subject, index) => (
          <List.Item key={index} name={subject} onClick={this.handleClick}>
            <List.Content>
              <div style={{ fontSize: 'large', paddingLeft: 5 }}>
                <List.Icon name="book" size="large" verticalAlign="middle" />
                {subject}
              </div>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
