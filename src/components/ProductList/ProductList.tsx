import React, { useState, useEffect } from 'react';
import {
  ReducerProduct,
  ItemProduct,
} from '../../store/ducks/reducerProducts/types';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../services/api';

import { getProducts } from '../../store/ducks/reducerProducts/action';

import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const products = useSelector(
    (state: ReducerProduct) => state.product.arrayProduct,
  ).sort(function (a, b): any {
    if (a.name < b.name) {
      return -1;
    } else {
      return true;
    }
  });

  useEffect(() => {
    dispatch(getProducts(data));
  }, [data, dispatch]);

  useEffect(() => {
    api
      .get('products')
      .then((response) => dispatch(getProducts(response.data)));
  }, [dispatch]);

  const update = (ids: any, qtd: any, value: number, e: string) => {
    const product = products
      .filter((itens: any) => {
        return itens._id === ids;
      })
      .map((itens: ItemProduct) => {
        return {
          _id: itens._id,
          name: itens.name,
          description: itens.description,
          value: itens.value,
          img: itens.img,
          qtd: e === 'mais' ? qtd + 1 : (qtd > 0 ? qtd - 1 : 0),
          total:
            e === 'mais'
              ? parseFloat(((qtd + 1) * value).toFixed(2))
              : parseFloat(((qtd - 1) * value).toFixed(2)),
        };
      });

    const newProducts = products.filter((itens: any) => {
      return itens._id !== ids;
    });

    const newArray = [...product, ...newProducts].sort(function (a, b): any {
      if (a.name < b.name) {
        return -1;
      } else {
        return true;
      }
    });
    setData(newArray);
  };

  return (
    <div className="home">
      <div className="beers-list">
        {products !== undefined &&
          products.map((item: ItemProduct) => (
            <div key={item._id} className="beer">
              <img src={item.img} alt={item.name} />
              <h3>{item.description}</h3>
              <span>{item.name}</span>
              <small>
                R$ {item.total && item.total > 0 ? item.total : item.value}
              </small>
              <br />
              <div className="buyTag">
                <span
                  onClick={() => update(item._id, item.qtd, item.value, 'mais')}
                >
                  <strong>+</strong>
                </span>
                <input type="text" value={item.qtd} readOnly />
                <span
                  onClick={() =>
                    update(item._id, item.qtd, item.value, 'menos')
                  }
                >
                  <strong>-</strong>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
