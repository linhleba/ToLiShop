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
import Transaction from '../components/transaction/Transaction';
import NganLuong from '../components/nganluong/NganLuong';
import MoMo from '../components/momo/MoMo';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/progress" exact component={Progress} />
      <Route path="/order" exact component={Order} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/password" exact component={Password} />
      <Route path="/history" exact component={History} />
      <Route path="/transaction" exact component={Transaction} />
      <Route
        path="/nganluong_69c0e927278812d14edac6cb7755d99a.html"
        exact
        component={NganLuong}
      />
      <Route path="/order/momo" component={MoMo} />
    </Switch>
  );
};

export default Routes;
