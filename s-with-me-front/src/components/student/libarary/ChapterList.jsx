import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Heading from '../../../common-ui/Heading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faEdit } from '@fortawesome/free-solid-svg-icons';
import { List } from 'semantic-ui-react';

export default class ChapterList extends PureComponent {
  componentDidMount() {
    const { requestChapterList, myBookId } = this.props;
    requestChapterList({ myBookId: myBookId });
  }
  render() {
    const { chapterList, myBookId } = this.props;
    return (
      <React.Fragment>
        <List ordered>
          {chapterList.map(({ mainChapter, subChapters }, index) => (
            <div key={index}>
              <List.Item>
                <Heading level={2}>
                  <FontAwesomeIcon icon={faHeading} style={{ paddingRight: 2 }} />
                  {mainChapter.mainChapterName}
                </Heading>
              </List.Item>
              <List.List>
                {subChapters.map((subChapter, index) => (
                  <Link
                    to={`/library/myBook/${myBookId}/solve/${subChapter.subChapterId}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <List.Item key={index}>
                      <Heading level={4}>
                        <FontAwesomeIcon icon={faEdit} style={{ paddingRight: 2 }} />
                        {subChapter.subChapterName}
                      </Heading>
                    </List.Item>
                  </Link>
                ))}
              </List.List>
            </div>
          ))}
        </List>
      </React.Fragment>
    );
  }
}
