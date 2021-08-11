import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Room from './pages/Room';
import Home from './pages/Home';
import Login from './pages/Login';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <div className="flex-1 flex flex-col">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
