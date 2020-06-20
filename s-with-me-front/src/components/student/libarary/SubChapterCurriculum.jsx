import React, { PureComponent } from 'react';
import Api from '../../../Api';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

export default class SubChapterCurriculum extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { subChapterName: '' };
  }

  componentDidMount() {
    this._isMounted = true;
    const { curriculum } = this.props;
    Api.get('/library/book', {
      params: { subChapterId: curriculum.subChapterId },
    }).then(({ data }) => {
      if (this._isMounted) this.setState({ subChapterName: data });
    });
  }
  componentWillMount() {
    this._isMounted = false;
  }

  render() {
    const { curriculum } = this.props;
    const { myBookId, subChapterId } = curriculum;
    const { subChapterName } = this.state;
    return (
      <List.Item>
        <List.Content verticalAlign="middle">
          <Link to={`/library/myBook/${myBookId}/solve/${subChapterId}?page=1`}>
            {subChapterName} 풀기
          </Link>
        </List.Content>
      </List.Item>
    );
  }
}
