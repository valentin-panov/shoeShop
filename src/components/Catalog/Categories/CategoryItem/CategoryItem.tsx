import React, { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../../../../interfaces/Interfaces';
import { RootState } from '../../../../store';
import { setCategory } from '../../../../reducers/Catalog/reducer';

export default function CategoryItem(item: Category): ReactElement {
  const category = useSelector((store: RootState) => store.catalog.category);
  const dispatch = useDispatch();

  const { title, id } = item;
  const changeCategory = (setId: number) => {
    dispatch(setCategory(setId));
  };
  return (
    <li className="nav-item">
      <Button className={`nav-link ${id === category ? 'active' : ''}`} onClick={() => changeCategory(id)}>
        {title}
      </Button>
    </li>
  );
}
