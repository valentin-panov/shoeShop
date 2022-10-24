import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../Preloader/Preloader';
import Error from '../../Error/Error';
import { asyncFetchData } from '../../../reducers/Categories/reducer';
import { RootState } from '../../../store';
import { Category } from '../../../interfaces/Interfaces';
import CategoryItem from './CategoryItem/CategoryItem';

export default function Categories(): ReactElement {
  const status = useSelector((store: RootState) => store.categories.status);
  const error = useSelector((store: RootState) => store.categories.error);
  const items = useSelector((store: RootState) => store.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchData());
  }, [dispatch]);

  return (
    <>
      {(status === 'pending' || status === 'success') && (
        <ul className="catalog-categories nav">
          {status === 'pending' && <Preloader />}

          {status === 'success' && items.length > 0 && (
            <>
              <CategoryItem key={0} {...{ id: 0, title: 'Все' }} />
              {items.map(
                (item: Category): ReactElement => (
                  <CategoryItem key={item.id} {...item} />
                )
              )}
            </>
          )}
        </ul>
      )}
      {status === 'error' && <Error message={error} />}
    </>
  );
}
