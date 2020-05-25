import React, { PureComponent } from 'react';

import Heading from '../../../common-ui/Heading';
import VerticalList from '../../../common-ui/VerticalList';

export default class ChapterList extends PureComponent {
  render() {
    const { chapterList } = this.props;
    return (
      <React.Fragment>
        <VerticalList spacingBetween={1}>
          {chapterList.map(({ mainChapter, subChapters }) => (
            <div>
              <Heading level={2}>{mainChapter.mainChapterName}</Heading>
              {subChapters.map(subChapter => (
                <Heading level={4}>{subChapter.subChapterName}</Heading>
              ))}
            </div>
          ))}
        </VerticalList>
      </React.Fragment>
    );
  }
}
