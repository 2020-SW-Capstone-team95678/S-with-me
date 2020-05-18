import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';

import NotFound from './components/NotFound';
import LoginApp from './components/LoginApp';
import SignUpS from './components/signUp/SignUpS';
import LibraryApp from './components/student/libarary/LibraryApp';
import BookDetail from './components/student/libarary/BookDetail';
import ProblemApp from './components/student/problem/ProblemApp';
import NoteApp from './components/student/note/NoteApp';

export default class App extends PureComponent {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <LoginApp />} />
            <Route path="/signup" exact render={() => <SignUpS />} />
            <Route path="/library" exact render={() => <LibraryApp />} />
            <Route
              path="/library/myBook/:myBookId"
              exact
              render={({ match }) => <BookDetail match={match} />}
            />
            <Route
              path="/library/myBook/:myBookId/solve"
              exact
              render={({ match }) => <ProblemApp match={match} />}
            />
            <Route path="/note" exact render={() => <NoteApp />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
