import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';

import NotFound from './components/NotFound';
import LoginApp from './components/LoginApp';
import LibraryApp from './components/student/libarary/LibraryApp';
import BookDetail from './components/student/libarary/BookDetail';
import ProblemApp from './components/student/problem/ProblemApp';
import NoteApp from './components/student/note/NoteApp';
import SignUpInputContainer from './containers/student/signUp/SignUpInputContainer';

export default class App extends PureComponent {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <LoginApp />} />
            <Route path="/signup" exact render={() => <SignUpInputContainer />} />
            <Route path="/student/library" exact render={() => <LibraryApp />} />
            <Route path="/student/library/myBook" exact render={() => <BookDetail />} />
            <Route path="/student/library/myBook/solve" exact render={() => <ProblemApp />} />
            <Route path="/student/note" exact render={() => <NoteApp />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
