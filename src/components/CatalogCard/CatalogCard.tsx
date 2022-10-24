import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ICard } from '../../interfaces/Interfaces';

export default function CatalogCard(item: ICard): ReactElement {
  const { images, title, price, id } = item;
  return (
    <div className="card shadow">
      <div className="card-img-top">
        <img src={images[0]} className=" img-fluid" alt={title} />
      </div>
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link to={`/items/${id}.html`} className="card-btn">
          <Button variant="outlined" color="primary">
            Заказать
          </Button>
        </Link>
      </div>
    </div>
  );
}
