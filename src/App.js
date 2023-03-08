import styles from './App.module.css';
import NavBar from './components/NavBar';
import SignInUpForm from './pages/auth/SignUpForm';
import Container from "react-bootstrap/Container";
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/signin" render={() => <h1>Sign in</h1>} />
          <Route exact path="/signup" render={() => <SignInUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>

      </Container>
    </div>
  );
}

export default App;
