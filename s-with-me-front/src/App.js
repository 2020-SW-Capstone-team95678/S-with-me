import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import ModalProvider from './ModalProvider';

import AddBookApp from './components/publisher/addBook/AddBookApp';
import NotFound from './components/NotFound';
import ProblemApp from './components/student/problem/ProblemApp';
import SignUpInputContainer from './containers/student/signUp/SignUpInputContainer';
import LibraryAppContainer from './containers/student/book/LibraryAppContainer';
import LoginContainer from './containers/student/signUp/LoginContainer';
import BookDetailContainer from './containers/student/book/BookDetailContainer';
import Profile from './components/student/profile/Profile';
import NoteAppContainer from './containers/student/note/NoteAppContainer';
import AppLayout from './components/student/AppLayout';
import NotificationContainer from './containers/NotificationContainer';

export default class App extends PureComponent {
  store = configureStore();
  constructor(props) {
    super(props);
    this.state = { logged: false };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin = () => {
    this.setState({ logged: true });
  };

  onLogout = () => {
    this.setState({ logged: false });
    window.sessionStorage.clear();
  };

  componentDidMount() {
    const id = window.sessionStorage.getItem('studentId');
    if (id) {
      this.onLogin();
    } else {
      this.onLogout();
    }
  }
  render() {
    const { logged } = this.state;
    return (
      <Provider store={this.store}>
        <ModalProvider>
          <Router>
            <Switch>
              <Route path="/" exact render={() => <LoginContainer logged={logged} />} />
              <Route path="/signup" exact render={() => <SignUpInputContainer />} />
              <AppLayout>
                <Switch>
                  <Route path="/profile" exact render={() => <Profile />} />
                  <Route
                    path="/library/myBook/:myBookId/solve/:subChapterId"
                    render={({ match, location }) => (
                      <ProblemApp match={match} location={location} />
                    )}
                  />
                  <Route
                    path="/library/myBook/:myBookId"
                    render={({ match }) => <BookDetailContainer match={match} />}
                  />
                  <Route path="/library" render={() => <LibraryAppContainer />} />
                  <Route path="/note" exact render={() => <NoteAppContainer />} />
                  <Route
                    path="/publisher/library/book"
                    exact
                    render={({ match }) => <AddBookApp match={match} />}
                  />
                  <NotificationContainer />
                </Switch>
              </AppLayout>
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </ModalProvider>
      </Provider>
    );
  }
}
