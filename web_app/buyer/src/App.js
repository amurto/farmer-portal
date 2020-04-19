import React, { useState, useCallback } from './node_modules/react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from './node_modules/react-router-dom';

// CSS
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

// Components
import Navigation from './components/Navigation/Header/Navigation';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Footer from './components/Navigation/Footer/Footer';
import Shop from './components/Shop/Shop';
import { AuthContext } from './components/Context/Auth/auth-context';
import { ShopContext } from './components/Context/shop-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const searched = useCallback((searchText) => {
    setSearch(searchText);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shop" exact>
          <Shop />
        </Route>
        <Route path="/about" exact>
          <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shop" exact>
          <Shop />
        </Route>
        <Route path="/about" exact>
          <Landing />
        </Route>
        <Redirect to="/about" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <ShopContext.Provider value={{ search: search, searched: searched }}>
        <Router>
          <Navigation />
            {routes}
          <Footer />
        </Router>
      </ShopContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
