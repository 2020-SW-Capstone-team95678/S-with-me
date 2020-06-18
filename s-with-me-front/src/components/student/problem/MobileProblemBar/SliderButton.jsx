import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { WithStore } from 'pure-react-carousel';
import { withStyles, css } from '../../../../common-ui/withStyles';

import PaginationContainer from '../../../../containers/student/PaginationContainer';

function SliderButton(props) {
  const [visibleFisrt, setVisibleFirst] = useState(true);
  const [visibleLast, setVisibleLast] = useState(true);
  const currentSlide = props.currentSlide;
  const handleDismissFirst = () => {
    setVisibleFirst(false);
  };
  const handleDismissLast = () => {
    setVisibleLast(false);
  };
  const { styles, myBookId, subChapterId } = props;
  return (
    <div>
      {currentSlide === 0 || currentSlide === 7 ? (
        <div {...css(styles.pagination)}>
          {visibleFisrt && currentSlide === 0 ? (
            <Message floating onDismiss={handleDismissFirst} content="페이지 당 8문제 입니다." />
          ) : visibleLast && currentSlide === 7 ? (
            <Message
              floating
              onDismiss={handleDismissLast}
              warning
              content="페이지의 마지막 문제입니다. 채점은 모두 하셨나요?"
            />
          ) : (
            <PaginationContainer myBookId={myBookId} subChapterId={subChapterId} />
          )}
        </div>
      ) : null}
      <div {...css(styles.pagination)}>
        <Button
          onClick={() => props.carouselStore.setStoreState({ currentSlide: currentSlide - 1 })}
          disabled={currentSlide === 0}
          basic
          color="orange"
          circular
          content="이전 문제"
        />
        <Button
          onClick={() => props.carouselStore.setStoreState({ currentSlide: currentSlide + 1 })}
          disabled={currentSlide === 7}
          basic
          color="orange"
          circular
          content="다음 문제"
        />
      </div>
    </div>
  );
}

export default WithStore(
  withStyles(() => ({
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '3px',
      paddingBottom: '3px',
    },
  }))(SliderButton),
  state => ({
    currentSlide: state.currentSlide,
  }),
);
