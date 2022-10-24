import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { ICard } from '../../../interfaces/Interfaces';
import { removeItem } from '../../../reducers/Cart/reducer';

export default function CartItem(props: {
  index: number;
  item: { item: ICard; size: string; quantity: number };
}): ReactElement {
  const { index, item } = props;
  const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <Link to={`/items/${item.item.id}.html`}>{item.item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.quantity}</td>
      <td>{item.item.price} руб.</td>
      <td>{item.item.price * item.quantity} руб.</td>
      <td>
        <Button variant="outlined" color="secondary" disableElevation onClick={() => handleDelete(index)}>
          Удалить
        </Button>
      </td>
    </tr>
  );
}
