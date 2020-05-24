import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import ModalProvider from './ModalProvider';

import NotFound from './components/NotFound';
import ProblemApp from './components/student/problem/ProblemApp';
import NoteApp from './components/student/note/NoteApp';
import SignUpInputContainer from './containers/student/signUp/SignUpInputContainer';
import LibraryAppContainer from './containers/student/book/LibraryAppContainer';
import LoginContainer from './containers/student/signUp/LoginContainer';
import BookDetailContainer from './containers/student/book/BookDetailContainer';

export default class App extends PureComponent {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <ModalProvider>
          <Router>
            <Switch>
              <Route path="/" exact render={() => <LoginContainer />} />
              <Route path="/signup" exact render={() => <SignUpInputContainer />} />
              <Route path="/library" exact render={() => <LibraryAppContainer />} />
              <Route
                path="/library/myBook/:myBookId"
                exact
                render={({ match }) => <BookDetailContainer match={match} />}
              />
              <Route
                path="/library/myBook/:myBookId/solve"
                exact
                render={({ match }) => <ProblemApp match={match} />}
              />
              <Route
                path="/library/myBook/:myBookId/solve/:continuePageNumber"
                exact
                render={({ match }) => <ProblemApp match={match} />}
              />
              <Route path="/note" exact render={() => <NoteApp />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </ModalProvider>
      </Provider>
    );
  }
}
