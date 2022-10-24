import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import CatalogCard from '../CatalogCard/CatalogCard';
import { ICard } from '../../interfaces/Interfaces';
import { asyncFetchData } from '../../reducers/TopSales/reducer';
import { RootState } from '../../store';

export default function TopSales(): ReactElement {
  const status = useSelector((store: RootState) => store.topSales.status);
  const error = useSelector((store: RootState) => store.topSales.error);
  const items = useSelector((store: RootState) => store.topSales.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchData());
  }, [dispatch]);

  return (
    <>
      {(status === 'pending' || status === 'success') && (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>

          {status === 'pending' && <Preloader />}

          {status === 'success' && items.length > 0 && (
            <div className="row">
              {items.map(
                (item: ICard): ReactElement => (
                  <CatalogCard key={item.id} {...item} />
                )
              )}
            </div>
          )}
        </section>
      )}
      {status === 'error' && <Error message={error} />}
    </>
  );
}
