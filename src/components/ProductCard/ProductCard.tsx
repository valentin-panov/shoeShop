import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import { RootState } from '../../store';
import { asyncFetchProductCard } from '../../reducers/ProductCard/reducer';
import { addItem } from '../../reducers/Cart/reducer';

export default function ProductCard(): ReactElement {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const status = useSelector((store: RootState) => store.productCard.status);
  const error = useSelector((store: RootState) => store.productCard.error);
  const item = useSelector((store: RootState) => store.productCard.item);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation: string = pathname.split('/')[2];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchProductCard(parseInt(splitLocation, 10)));
  }, [dispatch, splitLocation]);

  const handleBuy = () => {
    dispatch(addItem({ item, size: selectedSize, quantity }));
    history.push('/cart.html');
  };

  const { images, title, sku, manufacturer, color, material, reason, season, sizes } = item;

  const availableSizes = sizes.filter((el) => el.avalible);

  const selectSize = (id: string) => {
    setSelectedSize(id);
  };

  return (
    <>
      {status === 'pending' && <Preloader />}
      {status === 'error' && <Error message={error} />}
      {status === 'success' && (
        <section className="catalog-item">
          <h2 className="text-center">{title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {availableSizes && (
                    <span className="form_radio_btn">
                      {availableSizes.map((size) => (
                        <span key={size.size}>
                          <input
                            type="radio"
                            id={size.size}
                            name="size"
                            onClick={() => selectSize(size.size)}
                            defaultChecked={selectedSize === size.size}
                          />
                          <label htmlFor={size.size}> {size.size}</label>
                        </span>
                      ))}
                    </span>
                  )}
                  {!availableSizes.length && <span className="catalog-item-size">нет доступных размеров</span>}
                </p>
                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <Button
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity < 2}
                      color="default"
                      variant="contained"
                      disableElevation
                    >
                      -
                    </Button>
                    <span className="btn btn-outline-secondary">{quantity}</span>
                    <Button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity > 9}
                      color="default"
                      variant="contained"
                      disableElevation
                    >
                      +
                    </Button>
                  </span>
                </p>
              </div>
              <Button
                className="btn btn-danger btn-block btn-lg"
                onClick={() => handleBuy()}
                variant="contained"
                color="secondary"
                disabled={!selectedSize}
              >
                В корзину
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
