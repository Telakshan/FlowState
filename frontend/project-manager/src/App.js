import { useState, useCallback } from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Header from "./Components/Header/Header";
import Landing from "./Pages/Landing/Landing";
import DashBoard from './Components/DashBoard/DashBoard';
import { AuthContext } from "./Context/AuthContext";
import Chat from "./Components/Chat/Chat";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
         <Route exact path='/' component={DashBoard}/> 
        <Route path="/room/:roomId" component={Chat} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
