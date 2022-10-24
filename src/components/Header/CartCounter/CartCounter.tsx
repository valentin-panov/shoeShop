import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function CartCounter(): ReactElement {
  const items = useSelector((store: RootState) => store.cart.items);
  const count = items ? items.length : 0;
  return <>{!!count && <div className="header-controls-cart-full">{count}</div>}</>;
}
