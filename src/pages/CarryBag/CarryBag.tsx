import {
  ItemProduct,
  ReducerProduct,
} from '../../store/ducks/reducerProducts/types';
import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import './CarryBag.css';

const CarryBag = () => {
  const products = useSelector(
    (state: ReducerProduct) => state.product.arrayProduct,
  ).filter((itens: any) => {
    return itens.qtd > 0;
  });

  const amount = useSelector(
    (state: ReducerProduct) => state.product.arrayProduct,
  )
    .filter((itens: any) => {
      return itens.total > 0;
    })
    .map((itens: any) => {
      return itens.total;
    })
    .reduce((a: any, b: any) => {
      return a + b;
    });

  return (
    <>
      <Header />

      {products !== undefined &&
        products.map((itens: ItemProduct) => (
          <div className="overview-list" key={itens._id}>
            <div className="overview">
              <h3>{itens.name}</h3>
              <div className="overviewCar">
                <>
                  <img src={itens.img} alt={itens.name} />
                </>
                <>
                  <span>
                    {itens.qtd} x R$ {itens.value}
                  </span>
                </>
                <>
                  <span>R$ {itens.total}</span>
                </>
              </div>
            </div>
          </div>
        ))}

      {amount > 0 && (
        <div className="overview-list">
          <div className="overview">
            <span>Total</span>
            <h3>R$ {amount}</h3>

            <Button text="Finalizar Compra" />
          </div>
        </div>
      )}
    </>
  );
};

export default CarryBag;
