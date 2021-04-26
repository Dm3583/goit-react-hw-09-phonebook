import React, { lazy, Suspense, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import { PrivateRoute, PublicRoute } from '../components/Routes';
import { authOperations } from '../redux/auth';
import { authSelectors } from '../redux/auth';

const HomeView = lazy(() =>
  import('../views/HomeView' /* webpackChunkName: "home-page" */),
);
const LoginView = lazy(() =>
  import('../views/LoginView' /* webpackChunkName: "login-page" */),
);
const RegisterView = lazy(() =>
  import('../views/RegisterView' /* webpackChunkName: "register-page" */),
);
const ContactsView = lazy(() =>
  import('../views/ContactsView' /* webpackChunkName: "contacts-page" */),
);

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div>
        <AppBar />

        <Switch>
          <Suspense fallback={<h1>Loading ...</h1>}>
            <PublicRoute path="/" exact component={HomeView} />
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={RegisterView}
            />
            {!this.props.isGettingCurrentUser && (
              <PublicRoute
                path="/login"
                restricted
                redirectTo="/contacts"
                component={LoginView}
              />
            )}
            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={ContactsView}
            />
          </Suspense>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isGettingCurrentUser: authSelectors.getIsGettingCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(authOperations.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
