import {useState, useCallback} from 'react';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Header from "./Components/Header/Header";
import Landing from './Pages/Landing/Landing';
import Chat from './Components/Chat/Chat';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);


  return (
    <div>
      <Router>
        <Header />
        <Route exact path='/' component={Landing}/>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path='/chat' component={Chat}/>
          <Redirect to='/'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
