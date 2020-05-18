import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Heading from '../../../common-ui/Heading';
import VerticalList from '../../../common-ui/VerticalList';

export default class ChapterList extends PureComponent {
  static propTypes = {
    chapterList: PropTypes.arrayOf(
      PropTypes.shape({
        level1: PropTypes.bool,
        level1Name: PropTypes.string,
        level2: PropTypes.bool,
        level2Name: PropTypes.string,
      }),
    ),
  };

  render() {
    const { chapterList } = this.props;
    return (
      <React.Fragment>
        <VerticalList spacingBetween={1}>
          {chapterList.map(({ level1, level1Name, level2, level2Name }) =>
            level1 ? (
              <Heading level={2}>{level1Name}</Heading>
            ) : level2 ? (
              <Heading level={4}>{level2Name}</Heading>
            ) : null,
          )}
        </VerticalList>
      </React.Fragment>
    );
  }
}
