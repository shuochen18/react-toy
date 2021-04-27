import './App.css';
import Header from './Header';
import React from 'react';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
function App() {
  return (
    <div className="App">
      
      <Router>
        {/* header */}
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat"/>
            <ChatScreen />
          </Route>
          <Route path="/chat">
            <Header backButton="/"/>
            <Chats />
          </Route>
          <Route path="/">
            <Header/>
            <TinderCards />
            <SwipeButtons />
          </Route>

        </Switch>
        {/* Tinder Cards */}
        {/* Buttons below tinder cards */}

        {/* Chat screen */}
        {/* Individual chat screen */}
      </Router>

    </div>
  );
}

export default App;
