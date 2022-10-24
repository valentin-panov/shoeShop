import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { asyncPostOrder, setIdle } from '../../../reducers/Order/reducer';
import { RootState } from '../../../store';
import Preloader from '../../Preloader/Preloader';
import Error from '../../Error/Error';
import { clearCart } from '../../../reducers/Cart/reducer';

export default function OrderForm(): ReactElement {
  const dispatch = useDispatch();
  const itemsState = useSelector((store: RootState) => store.cart.items);
  const status = useSelector((store: RootState) => store.postOrder.status);
  const error = useSelector((store: RootState) => store.postOrder.error);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreement || !phone || !address) {
      return;
    }
    const items = itemsState.map((el) => ({
      id: el.item.id,
      price: el.item.price,
      count: el.quantity,
      size: el.size,
    }));
    dispatch(asyncPostOrder({ owner: { phone, address }, items }));
  };

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        dispatch(clearCart());
        dispatch(setIdle());
      }, 5000);
    }
  }, [dispatch, status]);

  return (
    <section className="order">
      {status === 'idle' && (
        <>
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form
              className="card-body"
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                handleSubmit(event);
              }}
            >
              <div className="form-group">
                <label htmlFor="phone">
                  Телефон
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    defaultValue={phone}
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      setPhone((event.target as HTMLInputElement).value);
                    }}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="address">
                  Адрес доставки
                  <input
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    defaultValue={address}
                    onInput={(event: FormEvent<HTMLInputElement>) => {
                      setAddress((event.target as HTMLInputElement).value);
                    }}
                  />
                </label>
              </div>
              <div className="form-group form-check">
                <label className="form-check-label" htmlFor="agreement">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    defaultChecked={agreement}
                    onChange={() => setAgreement(!agreement)}
                  />
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" disabled={!(agreement && address && phone)}>
                Оформить
              </button>
            </form>
          </div>
        </>
      )}
      {status === 'pending' && <Preloader />}
      {status === 'error' && <Error message={error} />}
      {status === 'success' && <Alert severity="success">ЗАКАЗ ОТПРАВЛЕН</Alert>}
    </section>
  );
}
