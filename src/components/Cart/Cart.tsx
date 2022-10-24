import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { RootState } from '../../store';
import CartItem from './CartItem/CartItem';
import OrderForm from './OrderForm/OrderForm';

export default function Cart(): ReactElement {
  const items = useSelector((store: RootState) => store.cart.items);
  const orderStatus = useSelector((store: RootState) => store.postOrder.status);
  const total = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {items.length === 0 && orderStatus === 'idle' && <Alert severity="info"> КОРЗИНА ПУСТА</Alert>}
        {items.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <CartItem index={index} item={item} key={item.item.id + item.size} />
              ))}
              <tr>
                <td colSpan={5} className="text-right">
                  Общая стоимость
                </td>
                <td>{total} руб.</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
      {items.length > 0 && <OrderForm />}
    </>
  );
}
