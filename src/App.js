import React from 'react';
import Header from "./components/UI/Header";
import { Route, Switch } from 'react-router-dom';
import Characters from "./components/pages/Characters/Characters";
import Episodes from "./components/pages/Episodes/Episodes";
import Locations from "./components/pages/Locations/Locations";
import MyWatchlist from "./components/pages/MyWatchlist/MyWatchlist";
import Page404 from "./components/pages/Page404/Page404";

function App() {
  return (
    <>
      <Header/>
      <main>
          <Switch>
              <Route exact path='/' component={Characters} />
              <Route exact path='/episodes' component={Episodes} />
              <Route exact path='/locations' component={Locations} />
              <Route exact path='/my-watch-list' component={MyWatchlist} />
              <Route component={Page404} />
          </Switch>
      </main>
    </>
  );
}

export default App;
