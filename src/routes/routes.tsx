import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Product from '../pages/Product/Product';
import CarryBag from '../pages/CarryBag/CarryBag';
import AuthLogin from '../pages/AuthLogin/AuthLogin';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticaded = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticaded ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/carryBag" component={CarryBag} />
        <Route path="/" exact>
          <Product />
        </Route>

        <Route path="/authLogin" component={AuthLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
