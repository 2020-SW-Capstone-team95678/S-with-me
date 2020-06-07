import React, { PureComponent } from 'react';
import TableCell from '../../../common-ui/table/TableCell';
import TableRow from '../../../common-ui/table/TableRow';
import Api from '../../../Api';
import { Link } from 'react-router-dom';

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
      <TableRow>
        <TableCell align="center">
          <Link
            to={`/library/myBook/${myBookId}/solve/${subChapterId}?page=1`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {subChapterName} 풀기
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}
