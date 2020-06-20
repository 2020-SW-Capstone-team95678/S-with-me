import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import ModalProvider from './ModalProvider';

import BookInfoPage from './components/publisher/createBook';
import NotFound from './components/NotFound';
import SignUpInputContainer from './containers/student/signUp/SignUpInputContainer';
import LibraryAppContainer from './containers/student/book/LibraryAppContainer';
import LoginContainer from './containers/student/signUp/LoginContainer';
import Profile from './components/student/profile/Profile';
import NoteAppContainer from './containers/student/note/NoteAppContainer';
import AppLayout from './components/student/AppLayout';
import PAppLayout from './components/publisher/AppLayout';
import NotificationContainer from './containers/NotificationContainer';
import ProblemAppContainer from './containers/student/problem/ProblemAppContainer';
import SignUpPublisherInputContainer from './containers/publisher/SignUpPublisherInputContainer';
import MyBookDetail from './components/student/libarary/MyBookDetail';

import LibraryApp from './components/publisher/library/LibraryApp';
import ProfilePublisher from './components/publisher/profile/Profile';
import RegisterProblem from './components/publisher/createBook/RegisterProblem';
import BookstoreAppContainer from './containers/bookstore/BookstoreAppContainer';
import BookDetailContainer from './containers/bookstore/BookDetailContainer';

export default class App extends PureComponent {
  store = configureStore();
  constructor(props) {
    super(props);
    this.state = { logged: false, isStudent: true };
  }

  setUserType = isStudent => {
    this.setState({ isStudent: isStudent });
  };

  setLogged = logged => {
    this.setState({ logged: logged });
  };

  onLogin = isStudent => {
    this.setState({ logged: true, isStudent: isStudent });
  };

  onLogout = () => {
    this.setState({ logged: false });
    window.sessionStorage.clear();
  };

  componentDidMount() {
    const studnetId = window.sessionStorage.getItem('studentId');
    const publisherId = window.sessionStorage.getItem('publisherId');
    if (studnetId) {
      this.onLogin(true);
    } else if (publisherId) {
      this.onLogin(false);
    } else {
      this.onLogout();
    }
  }

  render() {
    const { logged, isStudent } = this.state;
    if (!logged) {
      return (
        <Provider store={this.store}>
          <Router>
            <Switch>
              <Route
                path="/signup-publisher"
                exact
                render={() => <SignUpPublisherInputContainer />}
              />
              <Route path="/signup" exact render={() => <SignUpInputContainer />} />
              <Route
                path="/"
                render={() => (
                  <LoginContainer setUserType={this.setUserType} setLogged={this.setLogged} />
                )}
              />
            </Switch>
          </Router>
        </Provider>
      );
    }
    if (isStudent) {
      return (
        <Provider store={this.store}>
          <ModalProvider>
            <Router>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <LoginContainer setUserType={this.setUserType} setLogged={this.setLogged} />
                  )}
                />
                <AppLayout logged={logged} setLogged={this.setLogged}>
                  <Route path="/profile" exact render={() => <Profile />} />
                  <Route
                    path="/library/myBook/:myBookId/solve/:subChapterId"
                    render={({ match, location }) => (
                      <ProblemAppContainer match={match} location={location} />
                    )}
                  />
                  <Route
                    path="/library/myBook/:myBookId"
                    exact
                    render={({ match }) => <MyBookDetail match={match} />}
                  />
                  <Route path="/library" exact render={() => <LibraryAppContainer />} />
                  <Route path="/note" exact render={() => <NoteAppContainer />} />
                  <Route
                    path="/bookstore/detail/:bookId"
                    exact
                    render={({ match }) => <BookDetailContainer match={match} />}
                  />
                  <Route path="/bookstore" exact render={() => <BookstoreAppContainer />} />
                  <NotificationContainer />
                </AppLayout>
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </ModalProvider>
        </Provider>
      );
    } else {
      return (
        <Provider store={this.store}>
          <ModalProvider>
            <Router>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <LoginContainer setUserType={this.setUserType} logged={logged} />}
                />

                <PAppLayout>
                  <Route path="/profile" render={() => <ProfilePublisher />} />
                  <Route path="/library" render={() => <LibraryApp />} />
                  <Route path="/register-problem" render={() => <RegisterProblem />} />
                  <Route path="/publisher/library/book2" exact render={() => <BookInfoPage />} />
                  <NotificationContainer />
                </PAppLayout>
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </ModalProvider>
        </Provider>
      );
    }
  }
}
