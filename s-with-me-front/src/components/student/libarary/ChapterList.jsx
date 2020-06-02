import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Heading from '../../../common-ui/Heading';
import VerticalList from '../../../common-ui/VerticalList';

export default class ChapterList extends PureComponent {
  componentDidMount() {
    const { requestChapterList, myBookId } = this.props;
    requestChapterList({ myBookId: myBookId });
  }
  render() {
    const { chapterList, myBookId } = this.props;
    return (
      <React.Fragment>
        <VerticalList spacingBetween={1}>
          {chapterList.map(({ mainChapter, subChapters }, index) => (
            <div key={index}>
              <Heading level={2}>{mainChapter.mainChapterName}</Heading>
              {subChapters.map((subChapter, index) => (
                <Heading level={4} key={index}>
                  <Link
                    to={`/library/myBook/${myBookId}/solve/${subChapter.subChapterId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {subChapter.subChapterName}
                  </Link>
                </Heading>
              ))}
            </div>
          ))}
        </VerticalList>
      </React.Fragment>
    );
  }
}
