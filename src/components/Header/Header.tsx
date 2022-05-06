import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { ReducerProduct } from '../../store/ducks/reducerProducts/types';

import './Header.css';
import shoop from '../../assets/images/car.png';

const Header = () => {
  const { pathname } = window.location;

  const [sumAmount, setSumAmount] = useState(0);
  const [home, setHome] = useState(false);

  const products = useSelector(
    (state: ReducerProduct) => state.product.arrayProduct,
  );

  useEffect(() => {
    if (products.length > 0) {
      const sum = products
        .map((itens: any) => {
          return itens.qtd;
        })
        .reduce((a: any, b: any) => {
          return a + b;
        });

      setSumAmount(sum);
    }
  }, [products]);

  return (
    <header className="menu-bg">
      <div className="menu">
        <div className="menu-logo">
          <h1 onClick={() => setHome(true)}>Emporium Store</h1>
        </div>

        {home && <Redirect to="/" />}

        {pathname !== '/carryBag' ? (
          <div>
            <nav className="menu-nav">
              <ul>
                {sumAmount > 0 ? (
                  <li>
                    <NavLink to="/authLogin" exact>
                      <img src={shoop} alt="car shop" className="imgShoop" />{' '}
                      <span>{sumAmount}</span>
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/" exact>
                      <img src={shoop} alt="car shop" className="imgShoop" />{' '}
                      {sumAmount}
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        ) : (
          <div>
            <nav className="menu-nav">
              <ul>
                <li>
                  <NavLink to="/carryBag" exact>
                    <img src={shoop} alt="car shop" className="imgShoop" />{' '}
                    {sumAmount}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
