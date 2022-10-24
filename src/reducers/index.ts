// Reducers
import topSalesSlice from './TopSales/reducer';
import catalogSlice from './Catalog/reducer';
import categoriesSlice from './Categories/reducer';
import searchSlice from './Search/reducer';
import productCardSlice from './ProductCard/reducer';
import cartSlice from './Cart/reducer';
import postOrderSlice from './Order/reducer';

export const rootReducer = {
  topSales: topSalesSlice,
  catalog: catalogSlice,
  categories: categoriesSlice,
  search: searchSlice,
  productCard: productCardSlice,
  cart: cartSlice,
  postOrder: postOrderSlice,
};
