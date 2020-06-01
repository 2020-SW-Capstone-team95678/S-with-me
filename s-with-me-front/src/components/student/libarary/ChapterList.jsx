import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Heading from '../../../common-ui/Heading';
import VerticalList from '../../../common-ui/VerticalList';

export default class ChapterList extends PureComponent {
  render() {
    const { chapterList, myBookId } = this.props;
    return (
      <React.Fragment>
        <VerticalList spacingBetween={1}>
          {chapterList.map(({ mainChapter, subChapters }) => (
            <div>
              <Heading level={2}>{mainChapter.mainChapterName}</Heading>
              {subChapters.map(subChapter => (
                <Heading level={4}>
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
