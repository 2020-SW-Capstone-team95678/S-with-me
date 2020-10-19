import React, { PureComponent } from 'react';

import Text from '../../../common-ui/Text';
import Spacing from '../../../common-ui/Spacing';
import withLoading from '../../../common-ui/withLoading';
import { Card } from 'semantic-ui-react';
import BookCardContainer from '../../../containers/publisher/BookCardContainer';

const LoadingMessage = (
  <Spacing vertical={4} horizontal={2}>
    <Text large>데이터를 불러들이고 있습니다.</Text>
  </Spacing>
);

class BookOverview extends PureComponent {
  render() {
    const { bookList } = this.props;
    return (
      <div style={{ paddingTop: 5 }}>
        <Card.Group centered stackable doubling itemsPerRow={5}>
          {bookList.map((book, index) => (
            <Card key={index} centered>
              <BookCardContainer book={book} />
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default withLoading(LoadingMessage)(BookOverview);
