import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { asyncFetchData, asyncFetchMore, setCategory } from '../../reducers/Catalog/reducer';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';
import { ICard } from '../../interfaces/Interfaces';
import CatalogCard from '../CatalogCard/CatalogCard';
import Categories from './Categories/Categories';
import SearchField from './Search/SearchField';
import { setSearch } from '../../reducers/Search/reducer';

export default function Catalog(): ReactElement {
  const status = useSelector((store: RootState) => store.catalog.status);
  const error = useSelector((store: RootState) => store.catalog.error);
  const catalog = useSelector((store: RootState) => store.catalog.catalog);
  const category = useSelector((store: RootState) => store.catalog.category);
  const haveMore = useSelector((store: RootState) => store.catalog.haveMore);
  const searchString = useSelector((store: RootState) => store.search.searchString);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation: string = pathname.split('/')[1];

  const dispatch = useDispatch();

  if (splitLocation !== 'catalog.html') {
    dispatch(setSearch(''));
  }

  useEffect(() => {
    dispatch(setCategory(0));
  }, [dispatch]);

  const getMore = (count: string) => {
    dispatch(asyncFetchMore({ count, category, searchString }));
  };

  useEffect(() => {
    dispatch(asyncFetchData({ category, searchString }));
  }, [dispatch, category, searchString]);

  return (
    <>
      {(status === 'pending' || status === 'success') && (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          {splitLocation === 'catalog.html' && <SearchField />}
          <Categories />
          {status === 'pending' && <Preloader />}
          {status === 'success' && catalog.length > 0 && (
            <>
              <div className="col">
                <div className="row">
                  {catalog.map(
                    (item: ICard): ReactElement => (
                      <CatalogCard key={item.id} {...item} />
                    )
                  )}
                </div>
              </div>
              {haveMore && (
                <div className="text-center h2 shadow">
                  <Button variant="outlined" color="primary" onClick={() => getMore(`${catalog.length}`)}>
                    Загрузить ещё
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      )}
      {status === 'error' && <Error message={error} />}
    </>
  );
}
