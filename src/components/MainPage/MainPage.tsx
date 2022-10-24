import React, { ReactElement } from 'react';
import TopSales from '../TopSales/TopSales';
import Catalog from '../Catalog/Catalog';

export default function MainPage(): ReactElement {
  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
}
