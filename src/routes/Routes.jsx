import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Progress from '../components/progress/Progress';
import Order from '../pages/Order';
import Password from '../pages/Password';
import Profile from '../pages/Profile';
import History from '../pages/History';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/progress" component={Progress} />
      <Route path="/order" component={Order} />
      <Route path="/profile" component={Profile} />
      <Route path="/password" component={Password} />
      <Route path="/history" component={History} />
    </Switch>
  );
};

export default Routes;
